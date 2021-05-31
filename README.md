# course-app
### _A full-optional course manager_

`course-app` is my high school final project. I had to build a system that enabled a company to manage their courses in a web-app, including an hardware interface to authenticate the single users and decide whether their access to a room is granted or denied.

There's a live version of the application. You can find it by visiting the website at the following url: http://168.119.189.237:3000/
You can check both the `student` and the `admin` functionalities.

For the `student`, the credentials are:
- **`username:`** `harry.potter`
- **`password:`** `pass`

For the `admin`, the credentials are:
- **`username:`** `albus.silente`
- **`password:`** `pass`

## Room device
Every room of the infrastructure should have a dedicated hardware associated.
It consists in a Raspberry Pi that has an ACR122U NFC scaner and a SH1106 OLED display connected to it.
The source-code for the hardware side is written in Python and you can find it at the following repository: https://github.com/samueleallegranza/course-app-rpi