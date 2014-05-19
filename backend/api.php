<?php
/**
 * Created by PhpStorm.
 * User: lukas
 * Date: 5/11/14
 * Time: 10:53 PM
 */
/*
 * The MINT API
 * General every request has the format:
 * {
 *   "token" : <string> // Access token
 *   "data" : { // Any additional data needed in the request
 *      <JSON>
 *   }
 * }
 *
 * General: every response has the format:
 * {
 *    <JSON> // The result data of the request
 * }
 * Error are passed as HTTP Error Codes.
 */
require_once("rest.inc.php");
require_once("tam.php");
require_once("model.php");

class API extends REST
{
    public $data = "";
    const DB_SERVER = "localhost";
    const DB_USER = "web001_ksuster";
    const DB_PASSWORD = "umhTs4WRBbWc-w-";
    const DB = "web001_ksuster";

    private $db = NULL;
    private $user = NULL;
    private $model = NULL;

    public function __construct() {
        parent::__construct();
        $this->dbConnect();
        $this->model = new model();
    }

    // Begin UTILITY FUNCTIONS
    // Begin /dbConnect/
    // Purpose: connects to the mysql database
    private function dbConnect() {
        $this->db = @mysqli_connect( "localhost", "web001_ksuster", "umhTs4WRBbWc-w-", "web001_ksuster") or die("Verbindung zu MySQL gescheitert" );
        mysqli_set_charset( $this->db, 'utf8');
    }
    // End /dbConnect/

    // Begin function /json/
    // Purpose: decodes some data into json
    private function json( $data ) {
        if ( is_array( $data ) ) {
            return json_encode( $data );
        }
    }
    // End utility function /json/

    // Begin utility function /readDb/
    // Purpose: a general read function for the database, that doesn't use any "WHERE" statements
    private function readDb( $type ) {
        $objects_result = mysqli_query( $this->db, "SELECT * FROM " . $type );
        $objects = array();

        while( $object = mysqli_fetch_assoc( $objects_result ) ) {
            $objects[] = $object;
        }

        return $this->json( $objects );
    }
    // End utility function /readDb/

    // Begin utility function /convertMysqlToArray/
    // Purpose: convers a result from a mysql Query to a php array and returns it
    private function convertMysqlToArray( $objects_result ) {
        $objects = array();
        while( $object = mysqli_fetch_assoc( $objects_result ) ) {
            $objects[] = $object;
        }
        return $objects;
    }
    // End utility function /convertMysqltoArray/



    // Begin function /processApi/
    // Purpose: is the main function of the API.
    public function processApi() {
        $func = strtolower( trim( str_replace( "/", "", $_REQUEST['rquest'] ) ) );
        if ( (int) method_exists( $this, $func ) > 0 ) {
            $this->$func();
        }
        else {
            $this->response( '', 404 );
        }
    }


    // Begin function /comment
    // Purpose: The comment function is responsible for all REST Actions with the comment objects
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
        else if ( $this->get_request_method() == "GET" ) {
            $post_id = $_REQUEST['post_id'];
            if ( !$post_id ) {
                $post_id = "*";
            }
            $query = "SELECT * FROM comment WHERE post_id = $post_id";
            $result = $this->convertMysqlToArray( mysqli_query( $this->db, $query ) );
            $this->response( $this->json( $result ), 200 );
        }
    }
    // End function /comment/

    // Begin function /subject/
    // Purpose: The subject function is responsible for all REST Actions with the subject objects.
    public function subject() {
        if ( $this->get_request_method() != "GET" ) {
            $this->response( '', 406 );
        }
        $this->response(  $this->readDb( 'subject' ), 200 );
    }
    // End function /subject/

    // Begin function /admin/
    // Purpose: The admin function is responsible for all REST actions withe the admin objects
    public function admin() {
        if ( $this->get_request_method() != "GET" ) {
            $this->response( '', 406 );
        }

        $this->response( $this->readDb( 'admin' ), 200 );
    }
    // End function /admin/

    public function post() {
        header('Content-type: application/json; charset=UTF-8');
        if ( $this->get_request_method() == "GET" ) {
            $index = 0;
            if ( isset( $_REQUEST[ 'index' ]) ) {
                $index = $_REQUEST[ 'index' ];
            }
            $posts = $this->model->readPostsFromIndex( $index );

            $this->response( $this->json( $posts ), 200 );
        }
        else if ( $this->get_request_method() == "POST" ) {
            $data = json_decode( file_get_contents('php://input'), true );

            // check if the user is an admin
            if ( isset( $data['token'] ) && !$this->model->authenticate( $data ) ) {
                $this->response( "Unauthorized", 401 );
            }

            // check the data


            $post_data = $data[ 'data' ];
            $post_data[ 'admin_id' ] = 1;
            $post = $this->model->addPost( $post_data );

            if ( !isset( $post ) ){
                return $this->response( "Failed to create post", 400 );
            }

            $this->response( $this->json( $post  ), 200 );
        }
        else if ( $this->get_request_method() == "DELETE" ){

            $data = json_decode( file_get_contents('php://input'), true );

            // check if the user is an admin
            if ( isset( $data['token'] ) && !$this->model->authenticate( $data ) ) {
                $this->response( "Unauthorized", 401 );
            }

            // check the data (needs to be improved )
            $post_data = $data[ 'data' ];
            if ( !isset($post_data) || !isset($post_data['post_id'] ) ){
                return $this->response( "Failed to delete post", 400 );
            }

            if ( !$this->model->deletePost( $post_data ) ){
                return $this->response( "Failed to delete post", 400 );
            }
            $this->response( "", 200 );
        }

        $this->response( 'The requested operation is not available', 400 );
    }

    public function login() {
        if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
            $data = json_decode( file_get_contents('php://input'), true );

            $user = $this->model->login( $data );

            if ( ! isset( $user ) ) {
                $this->response( "Login failed", 200 );
            }
            $this->response( $this->json( $user ), 200 );
        }
        else {
            $this->response( "Error not post", 200 );
        }
    }

    // Begin function /start/
    // Purpose: The start functions the start data package, this function is called, when the
    // site loaded
    public function start() {

    }
    // End function /start/
}

$api = new API;
$api->processApi();

/* $headers = generateHeaders( "rest-example", "topsecret", "gr001" );
print $headers['Authorization'];
print $headers['X-gr-AuthDate']; */