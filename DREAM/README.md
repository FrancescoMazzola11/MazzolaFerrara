# Installation Guide

## DB Setup

Install the database dump provided in the DREAM root in MySQL Workbench via Server > Data Import > Import from Self-Contained File and select the dump.
Setup the DB credentials that you can find in the "DREAMS/BackEnd2/config/" in MySQL Workbench via Server > Users and Privileges > add account. From the Users and Privileges > Administrative Roles and select DBA for the new connection created.
Select Apply and the db connection is now complete

## NodeJS Installation

Download and Install NodeJS runtime from here: [NodeJS Download](https://nodejs.org/en/)

>**IMPORTANT**
>
>During the installation make sure to have both `npm package manager` and `Add to PATH` features selected.
>

## Install Dependencies
1. Clone the Repo
2. Move inside the DREAM/BackEnd 2 folder
3. Open a Shell/Command Prompt there
3. Run `npm install --save'
4. Repeat steps 2 and 3 for the folder DREAM/frontend

If any error occurs make sure to have Administration/root Privileges on the Shell (use sudo _command_to_run)

## Run the Server
1. Move inside the DREAM/BackEnd 2 folder
2. Open a Shell/Command Promt there
3. Run `npm start`
4. Repeat steps 2 and 3 for the folder DREAM/frontend

## Enjoy DREAMS
Now a webpage will pop-up in order to let you use the DREAMS applcation, if the browser does not 
automatically start you can go to `http://localhost:3000` and use DREAM