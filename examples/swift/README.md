# Swift Example

This example uses [CocoaPods](https://cocoapods.org) as a dependency manager. In this project directory, you will now want to run:

```bash
$ pod install
```

This will read the dependencies from `Podfile` and create an Xcode workspace that contains both the CocoaPods dependencies and this project. You will want to open the `.xcworkspace` file from now on, rather than the `.xcproject` file, since the workspace contains the dependency information!

### Caveat

You will need to edit [ViewController.swift](./Example/Example/ViewController.swift#L19) to point the `url` at an existing QDAPI installation!
