<?php
/**
 * Created by PhpStorm.
 * User: Lukas Reichart Copyright @Antum
 * Date: 5/19/14
 * Time: 2:20 PM
 */

// The model class is responsible for all database interactions
// The model class DOES NOT Validate any data => The passed data needs to be valid.
class model
{
    const DB_SERVER = "localhost";
    const DB_USER = "web001_ksuster";
    const DB_PASSWORD = "umhTs4WRBbWc-w-";
    const DB = "web001_ksuster";

    private $db = NULL;
    private $user = NULL;

    public function __construct() {
        $this->dbConnect();
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

    // Begin function /readUser/
    // Purpose: Reads a user with a given id from the database
    public function readUser( $user_id ) {
        $query = "SELECT * FROM user WHERE user_id = $user_id";
        $raw = mysqli_query( $this->db, $query );
        if ( !$raw ) {
            return null;
        }

        $user = mysqli_fetch_assoc( $raw );
        if ( !isset( $user ) ) {
            return null;
        }
        return $user;
    }
    // End function /readUser/

    // Begin utility function /convertMysqlToArray/
    // Purpose: convers a result from a mysql Query to a php array and returns it
    private function convertMysqlToArray( $objects_result ) {
        $objects = array();
        while( $object = mysqli_fetch_assoc( $objects_result ) ) {
            $objects[] = $object;
        }
        return $objects;
    }
    // End utility function /convertMysqlToArray/

    // Begin function /login/
    // Purpose: creates an access token and returns the data of the logged in user
    public function login( $user_data ) {
        $user = $this->readUser( $user_data['user_id'] );
        if ( ! isset($user) ) {
            return null;
        }
        $user;
    }
    // End function /login/

    // Begin function /authenticate/
    // Checks the security token of a user, if $admin_required is true, than the user has to have
    // admin rights
    public function authenticate( $data, $admin_required = false ) {
        if ( $this->user ){
            return true;
        }
        $token = $data['token'];
        $user = mysqli_fetch_assoc( mysqli_query( $this->db, "SELECT * FROM user WHERE token=$token") );
        if ( !$user ) { return false; }
        $this->user = $user;

        if ( $admin_required ) {
            // check if
        }

        return $user;
    }

    // Begin Post API
    // Begin function /readPostsFromIndex/
    // Purpose: Reads a set of post from the database starting at $index
    public function readPostsFromIndex( $index=0 ) {
        $query = "SELECT * FROM post p ORDER BY p.timestamp DESC LIMIT $index, 6";

        $raw = mysqli_query( $this->db, $query );

        if ( !isset( $raw ) ) {
            return false;
        }


        $posts = $this->convertMysqlToArray( $raw );
        return $posts;
    }
    // End function /readPostsFromIndex/


    // Begin function /addPost/
    // Purpose: Adds a new post to the database
    public function addPost ( $post_data ) {
        $subject_id = $post_data['subject_id'];
        $content = $post_data['content'];
        $admin_id = $post_data['admin_id'];
        $url = $post_data['url'];

        $create_query = "INSERT INTO post( subject_id, admin_id, content, url ) " .
            "VALUES( $subject_id, $admin_id, '$content', '$url')";
        if ( !mysqli_query( $this->db, $create_query ) ) {
            return null;
        }

        $post_id = mysqli_insert_id( $this->db );

        // select the table from the database
        $select_query = "SELECT * FROM post WHERE post_id = $post_id";
        $raw = mysqli_query( $this->db, $select_query );

        if ( !isset( $raw ) ) {
            return null;
        }
        return mysqli_fetch_assoc( $raw );
    }
    // End function /addPost/

    // Begin function /deletePost/
    // Purpose: Deletes a post from the database
    // Arguments: the post_id of the post
    public function deletePost( $data ) {
        $post_id = $data[ 'post_id' ];

        $delete_query = "DELETE FROM post WHERE post_id=$post_id";
        if ( !mysqli_query( $this->db, $delete_query ) ) {
            return false;
        }

        return true;

    }
    // End function /deletePost/

    // End Post API
}