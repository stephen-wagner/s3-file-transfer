s3-file-transfer
---------------------------
Node.js script to upload or download a single file to/from AWS S3

Authentication
---------------------------
1.  Add .aws folder to C:\Users\:yourname:
2.  Add credentials file to .aws folder
3.  credentials file should have three lines as follows:

	[default]
	aws_access_key_id=AKIAIOSFODNN7EXAMPLE
	aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

To Run
---------------------------
1.  Run CMD from folder containing s3-file-transfer.js
2.  Enter node s3-file-transfer.js --help for instructions