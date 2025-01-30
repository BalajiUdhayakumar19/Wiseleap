Feature: Tutor Login with Mobile Number in wise app and schedule a live session

@login @first
Scenario:1 common - Successful login as a tutor using mobile number and OTP 
Given user is on the Wise app login page
When user selects Login with Mobile number method 
And user adds mobile number and otp
Then user validates the dashboard page of wise app

@login 
Scenario:2 user should Navigate to course page  
Given user is on the Wise app dashboard page
When user selects group courses from side menu
And user clicks the classroom for automated testing course 
Then user should be naviagte to the selected course

@login @last
Scenario:3 User Schedule a live sesion
Given user is on the course page 
When user navigates to Live session Tab 
And user clicks the schedule session button
And user clicks create button 
Then the user validates that the session is successfully created