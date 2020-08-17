# Image search

This is simple application illustrating how you can use gyphy api to create an image search application.
Angular materials have been used for the basic ui components. 
The application has the following stucture:

  ### Components:
  * AppComponent (src/app/app.component.ts) implements the root component:
  * SearchComponent (src/app/components/search) implements the search box: 
  * ToolbarComponent (src/app/components/toolbar) implements the application header. It contains the following ui elements
    * Column count select: the number of columns the images should be divided into
    * Image type select: the gyphy resource type. Currently only gifs or stickers
    * Search box: enables us to search for images
  * ImageComponent: simple wrapper arround img tag to make the image loading more fluid
  * ImageCardComponent: component for rendering image details
  * ImageCardSheetComponent: container component for displaying the image detail at the bottom when clicking on image
  ### Services:
  * GyphyApi: a simple wrapper arround the gyph web api. For now only search has been implemented
  * ImageRepository: this is the service used by the application to fetch images. Later it could be extended to prefetch and cache image to improve perfomance and user experience. For now it only returns the image urls. Other information can be returned if we want to show more information about the images
  * ApplicationSettings: this is actually not really a service but just the application settings yout can inject. It contains currently 3 settings:
    * gyphyApiKey: the api key for the gyphy api
    * gyphyApiUrl: the base gyphy api url
    * badWords: the words that cannot be searched on
  * BadLanguageFilterService: this is a simple service that use ApplicationSettings.badWords to validate text

  ### Testings
  Most of the logic is covered by unit test. I didn't test all binding because lack of time.

## Development server

Run `nnpm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm test` to run all tests

It is recommended to install a Jest vscode extension for
debugging and running test seperatly
For example Jest runner.

Sometimes the Jest cache gets corrupted. If you get strange errors that certains files cannot be found.
Clear the jest cache directory. The cache directory is configured in jest.config.

```javascript
cacheDirectory:'<rootDir>/dist/jest'
```
