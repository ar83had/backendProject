This API mainly book ticket and give data of Available ticket of Specific Train

This are End Point of this API:-


1)railway/signup : First time user can sign up it by phone number and password and then servr send a token . if user if already sign up so they will print message;

2)railway/signin : This End point for already sign Up user . user can a sign in by phone number and password and then server will return a token in json format.

3)railway/signout : This End sign out the user . And redirect to it home page

4)railway/trainInfo/:id : This End point is open for all user weiher it authorized or not.
user got Available ticket info to specified train.

5)railway/booking : This End Point for Ticket Booking . Authorized user can book ticket by providing her phone number,train id,ticket count . if ticket is available and if ticket is not availabe then uer got a specific message.