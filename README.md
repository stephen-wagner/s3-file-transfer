s3-file-transfer
---------------------------
Node.js script to upload or download a single file to/from AWS S3

Authentication
---------------------------
Step 1.  Add .aws folder to C:\Users\:yourname:
\nStep 2.  Add credentials file to .aws folder
\nStep 3.  credentials file should have three lines as follows:

	[default]
	aws_access_key_id=AKIAIOSFODNN7EXAMPLE
	aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

To Run
---------------------------
Step 1.  Run CMD from folder containing app.js
\nStep 2.  Enter node s3-file-transfer.js --help for instructions