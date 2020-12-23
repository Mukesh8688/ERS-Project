create table ERS_USER_ROLES(
ERS_USER_ROLE_ID numeric,
USER_ROLE VARCHAR,
constraint ERS_USER_ROLES_PK primary key(ERS_USER_ROLE_ID)

);




create table ERS_USERS(
ERS_USERS_ID NUMERIC,
ERS_USERNAME VARCHAR,
ERS_PASSWORD VARCHAR,
ERS_FIRST_NAME VARCHAR,
ERS_LAST_NAME VARCHAR,
USER_EMAIL VARCHAR,
USER_ROLE_ID numeric,
constraint ERS_USERS_PK primary key(ERS_USERS_ID),
constraint ERS_USERS_UNv1 UNIQUE(ERS_USERNAME,USER_EMAIL),
constraint USER_ROLES_FK foreign key(USER_ROLE_ID) REFERENCES ERS_USER_ROLES(ERS_USER_ROLE_ID)

);



create table ERS_REIMBURSEMENT_STATUS(
REIMB_STATUS_ID numeric,
REIMB_STATUS VARCHAR,
constraint REIMB_STATUS_PK primary KEY(REIMB_STATUS_ID)
);


create table ERS_REIMBURSEMENT_TYPE(
REIMB_TYPE_ID numeric,
REIMB_TYPE VARCHAR,
constraint REIMB_TYPE_PK primary KEY(REIMB_TYPE_ID)
);


create table ERS_REIMBURSEMENT(
REIMB_ID numeric,
REIMB_AMOUNT numeric,
REIMB_SUBMITTED TIMESTAMP,
REIMB_RESOLVED TIMESTAMP,
REIMB_DESCRIPTION VARCHAR,
REIMB_RECEIPT BYTEA,
REIMB_AUTHOR numeric,
REIMB_RESOLVER numeric,
REIMB_STATUS_ID numeric,
REIMB_TYPE_ID numeric,
constraint ERS_REIMBURSEMENT_PK primary key(REIMB_ID),
constraint ERS_USERS_FK_AUTH foreign KEY(REIMB_AUTHOR) references ERS_USERS(ERS_USERS_ID), 
constraint ERS_USERS_FK_RESLVR foreign KEY(REIMB_RESOLVER) references ERS_USERS(ERS_USERS_ID),
constraint ERS_USERS_STATUS_FK foreign KEY(REIMB_STATUS_ID) references ERS_REIMBURSEMENT_STATUS(REIMB_STATUS_ID),
constraint ERS_USERS_TYPE_FK foreign KEY(REIMB_TYPE_ID) references ERS_REIMBURSEMENT_TYPE(REIMB_TYPE_ID) 
);



select * from ers_reimbursement er ;



insert into ers_users(ers_users_id,ers_username,ers_password,ers_first_name,ers_last_name,user_email,user_role_id) 
values(1,'mukesh','chicago','Mukesh','Chaudhary','cmukesh8688@gmail.com',4);

insert into ers_users(ers_users_id,ers_username,ers_password,ers_first_name,ers_last_name,user_email,user_role_id) 
values(2,'preet','chicago','Preet','Chaudhary','cmukesh8688@gmail.com',5);

insert into ers_users(ers_users_id,ers_username,ers_password,ers_first_name,ers_last_name,user_email,user_role_id) 
values(3,'John','password','John','Degree','john@gmail.com',4);


delete from ers_users ;


update ers_users set user_role_id = 4 where ers_users_id =1;


SELECT ers_users_id, ers_first_name, ers_last_name, user_email, user_role_id from ERS.ers_users 
			      WHERE ers_username = 'mukesh' and ers_password = 'password' ;


insert into ers_user_roles values(4,'employee'),(5,'manager');

 delete from ers_user_roles ;


select * from ers_users where ers_username ='mukesh' and ers_password = 'password';

SELECT ers_users_id, ers_first_name, ers_last_name, user_email, user_role_id FROM ers_users "
			     + " WHERE ers_username = 'mukesh' and ers_password = 'password' ;
			     
			    
SELECT ers_users_id, ers_first_name, ers_last_name, user_email, user_role_id 
FROM ers_users  WHERE ers_username = 'mukesh' and ers_password = 'password' ;


select * from ers_reimbursement er ;

select * from ers_users eu ;

select * from ers_reimbursement_status ers ;

insert into ers_reimbursement_status values(1,'Pending'),(2,'Approved');

insert into ers_reimbursement_status values(3,'Denied');


select * from ers_reimbursement_type ert ;

insert into  ers_reimbursement_type  values(1,'LODGING'),(2,'TRAVEL'),(3,'FOOD'),(4,'OTHER');


insert into ers_reimbursement values(1001,200,'12/10/2020','12/15/2020','This OCP Exam',null,1,1,2,4);

delete from ers_reimbursement ;


select * from ers_reimbursement er ;

select * from ers_user_roles eur ;


select * from ers_users eu ;

select * from ers_user_roles eur ;

update ers_user_roles
set  ers_user_role_id  = 4 , user_role = 'employee';

update ers_users
set ers_password = 'preet'
where ers_users_id =1;


SELECT er.reimb_id as id, er.reimb_amount as amount, er.reimb_submitted as submittedDate, 
er.reimb_resolved as resolvedDate, ers.reimb_status as status, ert.reimb_type as type
FROM ers_reimbursement er , ers_reimbursement_status ers ,ers_reimbursement_type ert 
WHERE er.reimb_status_id  = ers.reimb_status_id
and er.reimb_type_id = ert.reimb_type_id 
and er.reimb_author = 1;


select * from ers_users where ers_username = 'mukesh' and ers_password='chicago';


SELECT ers_users_id, ers_first_name, ers_last_name, user_email, user_role_id FROM ers_users 
 WHERE ers_username = 'mukesh' and ers_password = 'chicago' ; 


select * from ers_reimbursement;



UPDATE ers_reimbursement SET reimb_status_id= ?  WHERE reimb_id= ?;


SELECT er.reimb_id as id, er.reimb_amount as amount, er.reimb_submitted as submittedDate, 
er.reimb_resolved as resolvedDate, ers.reimb_status as status, ert.reimb_type as type
FROM ers_reimbursement er , ers_reimbursement_status ers ,ers_reimbursement_type ert 
WHERE er.reimb_status_id  = ers.reimb_status_id
and er.reimb_type_id = ert.reimb_type_id 
and er.reimb_status_id = 2 ; 



select max(reimb_id) as maxId from ers_reimbursement;


SELECT er.reimb_id as id, er.reimb_amount as amount, er.reimb_submitted as submittedDate, er.reimb_resolved as resolvedDate, ers.reimb_status as status, ert.reimb_type as type
FROM ers_reimbursement er , ers_reimbursement_status ers ,ers_reimbursement_type ert 
WHERE er.reimb_status_id  = ers.reimb_status_id
and er.reimb_type_id = ert.reimb_type_id order by status desc;

select * from ers_reimbursement_status ers ;


select * from ers_users eu ;

update ers_users set ers_username ='john'  where ers_users_id =3;


update ers_users set ers_password ='wgjjo0aR975fSezG0g7X5Q=='  where ers_users_id =3;


select * from ers_reimbursement;

UPDATE ers_reimbursement SET reimb_status_id= 2, reimb_resolved = '2020-12-21', reimb_resolver =2 WHERE reimb_id= 1006;


