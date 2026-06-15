// swift-tools-version: 5.10
import PackageDescription

let package = Package(
    name: "PSButton",
    platforms: [.iOS(.v16)],
    products: [
        .library(name: "PSButton", targets: ["PSButton"]),
    ],
    targets: [
        .target(
            name: "PSButton",
            path: "Sources/Button"
        ),
        .testTarget(
            name: "PSButtonTests",
            dependencies: ["PSButton"],
            path: "Tests"
        ),
    ]
)
