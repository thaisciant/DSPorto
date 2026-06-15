import XCTest
import SnapshotTesting
import SwiftUI
@testable import PSButton

final class PSButtonSnapshotTests: XCTestCase {

    private func snapshot(_ view: some View, name: String, file: StaticString = #file, line: UInt = #line) {
        let vc = UIHostingController(rootView: view.padding(8))
        vc.view.frame = CGRect(x: 0, y: 0, width: 320, height: 80)
        assertSnapshot(of: vc, as: .image(on: .iPhone13), named: name, file: file, line: line)
    }

    // MARK: - Primary
    func testPrimarySmDefault()  { snapshot(PSButton(label: "Primary", variant: .primary, size: .sm, action: {}), name: "primary-sm-default") }
    func testPrimaryMdDefault()  { snapshot(PSButton(label: "Primary", variant: .primary, size: .md, action: {}), name: "primary-md-default") }
    func testPrimaryLgDefault()  { snapshot(PSButton(label: "Primary", variant: .primary, size: .lg, action: {}), name: "primary-lg-default") }
    func testPrimaryMdDisabled() { snapshot(PSButton(label: "Primary", variant: .primary, size: .md, isDisabled: true, action: {}), name: "primary-md-disabled") }
    func testPrimaryMdLoading()  { snapshot(PSButton(label: "Primary", variant: .primary, size: .md, isLoading: true, action: {}), name: "primary-md-loading") }

    // MARK: - Secondary
    func testSecondarySmDefault()  { snapshot(PSButton(label: "Secondary", variant: .secondary, size: .sm, action: {}), name: "secondary-sm-default") }
    func testSecondaryMdDefault()  { snapshot(PSButton(label: "Secondary", variant: .secondary, size: .md, action: {}), name: "secondary-md-default") }
    func testSecondaryLgDefault()  { snapshot(PSButton(label: "Secondary", variant: .secondary, size: .lg, action: {}), name: "secondary-lg-default") }
    func testSecondaryMdDisabled() { snapshot(PSButton(label: "Secondary", variant: .secondary, size: .md, isDisabled: true, action: {}), name: "secondary-md-disabled") }
    func testSecondaryMdFullWidth(){ snapshot(PSButton(label: "Full Width", variant: .secondary, size: .md, fullWidth: true, action: {}), name: "secondary-md-full-width") }
}
