# Meet-Up Event Planner
*a part of Udacity's Senior Web Developer Nanodegree Program*




### About this Project

This is the first project from the Udacity's Senior Web Developer Nanodegree program.  The focus of this project is web forms -- specifically, simple web forms that are painless to fill out. The project should contain primarily three main parts:

* a form to create an account,
* a form to create an event, and
* an area that displays events.

[Additional requirements can be found in the project specification here.](requirements.pdf)



Additional features the app has, but were not required:

* events created by the user are saved to local storage, which means they will still be there when he closes his browser and opens it again.
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform)  used for place autocomplete




### The easiest way to view the app

* Clone the repository to your desktop
* Open the index.html in either `src` or `dist` folder



### Running the Build Process

To use the same build process I used, clone the repository to your desktop, and from the root of the desktop, type the following command:

```
$ npm install 
```

After all of the modules from the package.json file have installed, run the following command: 

```
$ gulp serve
```
This will allow you to live edit the following files in the `src` folder and immediately see the results on any device in your wireless network:

* index.html
* any file in the `ecma6` folder
* any file in the `sass` folder

Additionally, you can safely write with ECMA Script 6 and SASS, and your code will be __automatically__ be converted into ECMA Script 5 and vanilla CSS.


If you would like to take a look at the distributed version of the app, run the command:

```
$ gulp serve:dist
```


In order to keep the app in the `src` folder in sync with the app in the `dist` folder, manually modify only files in the `src`file.  If a local server is not running by using the `gulp serve` command, you will have to use `gulp update` to update the files in the `dist` folder after making changes to the files in the `src` file.










### Sources

* [Udacity's Senior Web Developer Nanodegree Program](https://www.udacity.com/course/senior-web-developer-nanodegree-by-google--nd802)

* [Meet-up Event Planner Project Specification](requirements.pdf)


### License

This is a public domain work, dedicated using
[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Feel free to do
whatever you want with it.

