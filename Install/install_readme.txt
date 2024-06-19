Open Effect installation consists of two steps: engine install and demo site install. There can be many sites based on one engine. Each requires separate database. We will install one site, so we need to create TWO different databases on host.

* OPENEFFECT ENGINE CORE INSTALLATION *

Create database on your server which will be used for core engine.

Exctract all files to your directory on the server.

Go to /EngineFiles/conf/

Make the following changes in /EngineFiles/conf/db_schemes.conf.php:

("errors_to" => "your@email.here") "your@email.here" is your e-mail address
("host"      => "YourHostAddress") "YourHostAddress" is database HOST
("database"  => "YourProjectName") "YourProjectName" is DATABASE name
("user"      => "UserName") "UserName" is database USERNAME
("password"  => "UserPassword") "UserPassword" is database PASSWORD

Note: database user MUST HAVE "create table" privileges to database.

Start from browser the http://<your site address>/Install/install_mysql.php script to proceed with the installation.

Installation script requires ALL configs correctly written in db_shemes.conf.php. If any will be written incorrectly, script will not continue.

Installation script requires only one step. Easy and fast! You just need to fill out the following fields:

Admin Name
Admin Surname
Admin Login Name
Admin Password
 
Click on "Continue" (do not click twice!!!), and Open Effect will create database tables and insert all necessary data.

* OPENEFFECT DEMO SITE INSTALLATION *

Create database on your server which will be used for demo files engine.

Go to /DemoFiles/conf/

Make the following changes in /EngineFiles/conf/db_schemes.php:

("errors_to" => "your@email.here") "your@email.here" is your e-mail address
("host"      => "YourHostAddress") "YourHostAddress" is database HOST
("database"  => "YourProjectName") "YourProjectName" is DATABASE name
("user"      => "UserName") "UserName" is database USERNAME
("password"  => "UserPassword") "UserPassword" is database PASSWORD

Usually, if you are using one host with several databases, it is enough to copy data from engine's config, and change database name.

Start from browser the http://<your site address>/Install/installdemo_mysql.php script to proceed with the installation.

Installation script requires ALL configs correctly written in db_shemes.conf.php. If any will be written incorrectly, script will not continue.

You also will need to fill out the following fields:

Admin Name
Admin Surname
Admin Login Name
Admin Password

Click on "Continue" (do not click twice!!!), and Open Effect will create database tables and insert all necessary data for the demo site.

* ENTERING ADMIN AREA *

Go to http://<your site address>/DemoFiles/engine/
and enter login/password you've specified via Demo Files install.

Note that OpenEffect administration panel is specific to a browser. It is written using JavaScript, and works only in Internet Explorer 5.0 or higher.

Refer to our manual how to work with OpenEffect.

Thank you for choosing our product.

Good luck!