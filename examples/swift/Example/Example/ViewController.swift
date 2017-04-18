//
//  ViewController.swift
//  Example
//
//  Created by Seth Battis on 4/12/17.
//  Copyright © 2017 Seth Battis. All rights reserved.
//

import UIKit
import Alamofire

class ViewController: UIViewController {

    @IBOutlet weak var OutputText: UITextView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let fooEndpoint: String = "https://example.com/api/v1/foo"
        
        Alamofire.request(fooEndpoint, method: .get).responseJSON { response in
            print("GET")
            guard let json = response.result.value as? [Any] else {
                print("Didn't get foos as JSON array from API")
                print("Error: \(response.result.error)")
                return
            }
            print(json)
        }
        
        Alamofire.request(fooEndpoint + "/1", method: .get).responseJSON { response in
            print("GET/:id")
            guard let json = response.result.value as? [String: Any] else {
                print("Didn't get foo as JSON object from API")
                print("Error: \(response.result.error)")
                return
            }
            print(json)
        }
        
        let newFoo: [String: Any] = ["bar": "dummy info", "baz": "more dummy info"]
        Alamofire.request(fooEndpoint, method: .post, parameters: newFoo, encoding: JSONEncoding.default).responseJSON { response in
            print("POST")
            guard let json = response.result.value as? [String: Any] else {
                print("Didn't get foo as JSON object from API")
                print("Error: \(response.result.error)")
                return
            }
            print(json)
            
            let updateFoo: [String: Any] = ["baz": "smart info!"]
            Alamofire.request(fooEndpoint + "/\(json["id"])", method: .put, parameters: updateFoo, encoding: JSONEncoding.default).responseJSON { response in
                print("PUT/:id")
                guard let json = response.result.value as? [String: Any] else {
                    print("Didn't get foo as JSON object from API")
                    print("Error: \(response.result.error)")
                    return
                }
                print(json)
                
                Alamofire.request(fooEndpoint + "/\(json["id"])", method: .delete).responseJSON { response in
                    print("DELETE/:id")
                    guard let json = response.result.value as? String else {
                        print("DELETE Didn't get count as JSON object from API")
                        print("Error: \(response.result.error)")
                        return
                    }
                    print(json)
                }
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

