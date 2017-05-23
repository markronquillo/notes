Introduction to Progressive Web Apps
-------------------------------------

# Lesson 1: Progressive Web Apps

Best of webs and best of the apps


Service Workers are Network Progressive enhancement
It sits between the browser and the server acting like a client side proxy


Web App Manifest file
- gives the ability to control how apps is displayed to the user.
- 

App Shell - typically the content of your app/site that doesn't change much often.


webpagetest

Load the App Shell, then make an ajax request to get the initial data.


Storage:

1. LocalStorage
- Pros: available almost everywhere
- Cons: it is synchronous, means it is blocking, Not Transactional

2. Cache Storage
- Pros: Easy to use, Async, Fast
- Cons: Not Transactional -- means you can overwrite something , not available in most areas.

3. IndexedDB
- Pros: Fast, Complex Data, Async, Transactional
- Cons: hard to setup

localForage, lovefield


Lesson 1: Final Task

1. Choose a storage engine
2. Save the selected cities of the user,
3. During onload, check if there are cities saved then fetch current data for those cities to dispay
4. Bonus: button to delete selected cities.


