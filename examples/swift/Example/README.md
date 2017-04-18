# Swift Example

This example uses the Alamofire CocoaPod, which requires CocoaPods to be installed as a dependency manager. If this is the first time you are using CocoaPods, run:

```bash
$ sudo gem install cocoapods
```

Once you have installed CocoaPods once, you don't need to install it again. In this project directory, you will now want to run:

```bash
$ pod install
```

This will read the dependencies from `Podfile` and create an Xcode workspace that contains both the CocoaPods dependencies and this project. You will want to open the `.xcworkspace` file from now on, rather than the `.xcproject` file, since the workspace contains the dependency information!

If you wanted to initialize a new project to use CocoaPods:

  1. Create the project in Xcode.
  2. Close the project!
  3. In the project directory:
  ```bash
  $ pod init
  ```
  to create the `Podfile`
  4. Edit the `Podfile` to include your dependencies
  5. In the project directory:
  ```bash
  $ pod install
  ```
