# Image Processing API

An image proccessin API that takes an image, resizes it to user specifications , and saves it for later use.

## Description

This API utilizes express.js, Jasmine js testing framework and node file system.

## Getting Started

### Dependencies

- This program requires node.js
- it also uses multible node dependencies, such as:
  - Express.js
  - TypeScrips
  - Jasmine
  - Supertest
  - Eslint
  - Prettier
  - Sharp
  - nodemon

### Installing

To use this API on your local machine, follow these steps:

- Run the following command in your terminal to clone this repo:

```
git clone https://github.com/aekhatean/image-processing-api.git
```

- After this repo is cloned to your device, enter the project directory and enter the following command:

```
npm install
```

Now, this project with all of the necessary dependancies can be run from your local device.

### Executing program

Ways to use this API through terminal

- To run this code for production:

```
npm run build
```

- To run this project for development

```
npm run start
```

- To format the code using Prettier

```
npm run prettier
```

- To lint the code using eslint

```
npm run lint
```

- To test and build the code for production

```
npm run build
```

## Using the API

To use this API for image resizing, enter this following at the end of your URL in your browser:

```

api?imageName=$imagename&width=$desiredWidth&height=$desiredHeight

```

You should replace the variables starting with "$", where:

- $imagename: Is the image you want to resize from the Images directory, ex: fjord.jpg
- $desiredWidth: Is the width you would like to turn your image to in pixels, ex: 300
- $desiredHeight: Is the height you would like to turn your image to in pixels, ex: 200

Now, you have a thumbnail of the size of your choice in your thumbnails directory.

## Authors

Contributors names and contact info

Adham Khatean

- Github:[@aekhatean](https://github.com/aekhatean)
- Linkedin: [@Adhamkhatean](https://www.linkedin.com/in/adhamkhatean/)

## Version History

- 1.0.0
  - Initial Release

## License

This project is licensed under the [ISC] License

```

```
