# Table structure for table 'DocLinks'
CREATE TABLE DocLinks (
GrpID int(11) default NULL,
DocID int(11) default NULL,
sortNr int(11) default '1'
);

# Table structure for table 'DocSec'
CREATE TABLE DocSec (
DocID int(11) default NULL,
RoleID int(11) default NULL,
Access varchar(10) default NULL
);

# Table structure for table 'Documents'
CREATE TABLE Documents (
ID int(11) NOT NULL default '1',
RecTime datetime default NULL,
LastUpdate datetime default NULL,
visible int(11) default '0',
searchVisible int(11) default '0',
keyWords text,
templateID int(11) default '0',
UserID int(11) default NULL,
name varchar(255) default NULL,
PRIMARY KEY(ID)
);

# Table structure for table 'Groups'
CREATE TABLE Groups (
ID int(11) NOT NULL default '1',
parentID int(11) default NULL,
name varchar(255) default NULL,
sortNr int(11) default '1',
templateID int(11) default '0',
inheritAccess int(11) default '0',
visible int(11) default '1',
PRIMARY KEY(ID)
);

# Table structure for table 'GrpSec'
CREATE TABLE GrpSec (
GrpID int(11) default NULL,
RoleID int(11) default NULL,
Access varchar(10) default NULL
);

# Table structure for table 'Log'
CREATE TABLE Log (
ID int(11) NOT NULL auto_increment,
DateTime datetime default NULL,
UserID int(11) default NULL,
Operation varchar(255) default NULL,
PRIMARY KEY(ID)
);

# Table structure for table 'OIDTable'
CREATE TABLE OIDTable (
ID int(11) default '1'
);

# Table structure for table 'Role'
CREATE TABLE Role (
RoleID int(11) NOT NULL default '1',
Name varchar(255) default NULL,
PRIMARY KEY(RoleID)
);

# Table structure for table 'TxtContents'
CREATE TABLE TxtContents (
ID int(11) NOT NULL default '1',
content text,
name varchar(255) default NULL,
Lang int(11) default NULL,
PRIMARY KEY(ID)
);

# Table structure for table 'TxtDetails'
CREATE TABLE TxtDetails (
DocID int(11) default NULL,
TxtID int(11) default NULL
);

# Table structure for table 'User_Role'
CREATE TABLE User_Role (
UserID int(11) default NULL,
RoleID int(11) default NULL
);

# Table structure for table 'Users'
CREATE TABLE Users (
UserID int(11) NOT NULL default '1',
Nick varchar(255) default NULL,
Password varchar(255) default NULL,
Name varchar(255) default NULL,
SName varchar(255) default NULL,
Email varchar(155) default NULL,
DocID int(11) default NULL,
Remarks varchar(255) default NULL,
PRIMARY KEY(UserID)
);

# Table structure for table 'UsersGrp'
CREATE TABLE UsersGrp (
UserID int(11) default NULL,
GrpID int(11) default NULL
);

# Table structure for table 'formXgroup'
CREATE TABLE formXgroup (
formID int(11) default NULL,
groupID int(11) default NULL,
access varchar(10) default NULL
);

# Table structure for table 'pageCache'
CREATE TABLE pageCache (
ID int(11) default '0',
updatePeriod int(11) default NULL,
updateLast int(11) default NULL
);

# Table structure for table 'templates'
CREATE TABLE templates (
ID int(11) default NULL,
name varchar(255) default NULL,
cfgFile varchar(255) default NULL,
frmID int(11) default NULL
);
