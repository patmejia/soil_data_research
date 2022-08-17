# Start: Connecting to the OSSL via Studio 3T

## - Parameters:

- Connection Name: `soilspec4gg`
- Server: `api.soilspectroscopy.org`
- Authentication DB: `soilspec4gg`
- User name: `soilspec4gg`
- Password: `soilspec4gg`
- Use SSL: `true`
- Accept any SSL certificates: `true`

## - Free download [Studio 3T](https://robomongo.org/) and complete installation.

## - In Studio 3T:

- Click on the New Collection icon:
  ![new collection icon](images/new_collection.png)

- Select the `manually configure my connection setting` option:
  ![auth step1](images/auth_screen1.png)

- Fill in the Connection name `soilspec4gg` and, in the `Server` tab, fill with OSSL's given address `api.soilspectroscopy.org`:
  ![auth step2](images/auth_screen2.png)

- Go to the Authentication tab and select Basic Authentication Mode:
  ![auth step3](images/auth_screen3.png)

- Fill in the User name, Password, and Authentication DB with `soilspec4gg`:
  ![auth step4](images/auth_screen4.png)

- Under the SSL tab, select `Use SSL protocol to connect` and `accept any server SSL certificates:
  ![auth step5](images/auth_screen5.png)

- Test Connection before saving:
  ![auth step6](images/auth_screen6.png)

- Finally, click `save` and `connect`:
  ![auth step7](images/auth_screen7.png)
