<?php
/**
 * Created by PhpStorm.
 * User: lukas
 * Date: 5/11/14
 * Time: 10:53 PM
 */
require_once("rest.inc.php");
require_once("tam.php");

class API extends REST
{
    public $data = "";
    const DB_SERVER = "localhost";
    const DB_USER = "web001_ksuster";
    const DB_PASSWORD = "umhTs4WRBbWc-w-";
    const DB = "web001_ksuster";

    private $db = NULL;
    private $user = NULL;

    public function __construct() {
        parent::__construct();
        $this->dbConnect();

    }

    private function dbConnect() {
        $this->db = @mysqli_connect( "localhost", "web001_ksuster", "umhTs4WRBbWc-w-", "web001_ksuster") or die("Verbindung zu MySQL gescheitert" );
        mysqli_set_charset( $this->db, 'utf8');
    }

    private function json( $data ) {
        if ( is_array( $data ) ) {
            return json_encode( $data );
        }
    }

    private function authenticate( $data ) {
        if ( $this->user ){
            return true;
        }
        $token = $data['token'];
        $user = mysqli_fetch_assoc( mysqli_query( $this->db, "SELECT * FROM user WHERE token=$token") );
        if ( !$user ) { return false; }
        $this->user = $user;
        return true;
    }

    public function processApi() {
        $func = strtolower( trim( str_replace( "/", "", $_REQUEST['rquest'] ) ) );
        if ( (int) method_exists( $this, $func ) > 0 ) {
            $this->$func();
        }
        else {
            $this->response( '', 404 );
        }
    }

    private function readDb( $type ) {
        $objects_result = mysqli_query( $this->db, "SELECT * FROM " . $type );
        $objects = array();

        while( $object = mysqli_fetch_assoc( $objects_result ) ) {
            $objects[] = $object;
        }

        return $this->json( $objects );
    }

    public function comment() {
        if ( $this->get_request_method() == "POST" ) {
            $data = json_decode( file_get_contents('php://input'), true );
            if ( !$this->authenticate( $data ) ){
                $this->response( "unauthorized access", 400 );
            }

            // write the comment to the database
            $comment = $data['data'];
            $post_id = $comment['post_id'];
            $comment_m = $comment['comment'];
            $user_id = $this->user['user_id'];
            $query = "INSERT INTO comment( post_id, comment, user_id ) VALUES( $post_id, '$comment_m', $user_id)";
            mysqli_query( $this->db, $query );
            $this->response( $this->json( $comment ), 200 );
        }
    }

    public function subject() {
        if ( $this->get_request_method() != "GET" ) {
            $this->response( '', 406 );
        }
        $this->response(  $this->readDb( 'subject' ), 200 );
    }

    public function admin() {
        if ( $this->get_request_method() != "GET" ) {
            $this->response( '', 406 );
        }

        $this->response( $this->readDb( 'admin' ), 200 );
    }

    public function post() {
        header('Content-type: application/json; charset=UTF-8');
        if ( $this->get_request_method() != "GET" ) {
            $this->response( 'not get', 406 );
        }
        // fetch all the posts, additionally add the data for the admins and subjects
        $posts_result = mysqli_query( $this->db,  "SELECT * FROM post p ORDER BY p.date DESC LIMIT 30");
        $posts = array(); $admins = array(); $subjects = array();

        while( $post = mysqli_fetch_assoc( $posts_result ) ) {
            $posts[] = $post;

            // check if this is a new admin
            if ( !array_key_exists( $post['admin_id'], $admins ) ){
                $admin_result = mysqli_query( $this->db, "SELECT * FROM admin a WHERE a.admin_id=$post[admin_id]" );
                $admin = mysqli_fetch_assoc( $admin_result );
                $admins[ $admin['admin_id'] ] = $admin;
            }


        }
        $result = array();
        $result[ 'posts' ] = $posts;
        $result[ 'admins' ] = $admins;

        $this->response( $this->json( $result ), 200 );
    }



    public function login() {
        if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
            $data = json_decode( file_get_contents('php://input'), true );
            $user_id = $data[ 'user_id' ];
            if ( !$user_id ) {
                $this->response( "userid is not defined", 200 );
            }
            $user_result = mysqli_query( $this->db, "SELECT * FROM user WHERE user_id=$user_id" );
            $user = mysqli_fetch_assoc( $user_result );
            if ( !$user ) {
                $this->response( "", 200 );
            }
            $this->response( $this->json($user), 200 );
        }
        else {
            $this->response( "Error not post", 200 );
        }
    }
}

$api = new API;
$api->processApi();

/* $headers = generateHeaders( "rest-example", "topsecret", "gr001" );
print $headers['Authorization'];
print $headers['X-gr-AuthDate']; */