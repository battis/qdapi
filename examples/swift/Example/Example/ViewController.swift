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
        
        let fooEndpoint: String = "https://roswell.stmarksschool.org/~sethbattis/api/v1/foo"

        /* GET all of the data in the foo table */
        Alamofire.request(fooEndpoint, method: .get).responseJSON { response in
            guard let json = response.result.value as? [[String: Any]] else {
                print("Didn't get foos as JSON array from API")
                print("Error: \(response.result.error)")
                return
            }
            for item in json {
                print("id: \(item["id"]!); bar: \(item["bar"]!); baz: \(item["baz"]!)")
            }
            print(json)
            /*
             * output:
             *
             * id: 1; bar: hello world; baz: purple people eaters
             * id: 2; bar: the quick brown fox; baz: asparagus
             * id: 3; bar: red; baz: raspberry
             */
        }
        
        /* GET a single record */
        Alamofire.request(fooEndpoint + "/2", method: .get).responseJSON { response in
            guard let json = response.result.value as? [String: Any] else {
                print("Didn't get foo as JSON object from API")
                print("Error: \(response.result.error)")
                return
            }
            print("id: \(json["id"]!); bar: \(json["bar"]!); baz: \(json["baz"]!)")
        }
        /*
         * output:
         *
         * id: 2; bar: the quick brown fox; baz: asparagus
         */
        
        /* POST a new record */
        let newFoo: [String: Any] = ["bar": "dummy info", "baz": "more dummy info"]
        Alamofire.request(fooEndpoint, method: .post, parameters: newFoo, encoding: JSONEncoding.default).responseJSON { response in
            guard let json = response.result.value as? [String: Any] else {
                print("Didn't get foo as JSON object from API")
                print("Error: \(response.result.error)")
                return
            }
            print("id: \(json["id"]!); bar: \(json["bar"]!); baz: \(json["baz"]!)")
            /*
             * output:
             *
             * id: 4; bar: dummy info; baz: more dummy info
             */
            
            /* PUT updates to an existing record (the one we just inserted!) */
            let updateFoo: [String: Any] = ["baz": "smart info!"]
            Alamofire.request(fooEndpoint + "/\(json["id"]!)", method: .put, parameters: updateFoo, encoding: JSONEncoding.default).responseJSON { response in
                guard let json = response.result.value as? [String: Any] else {
                    print("Didn't get foo as JSON object from API")
                    print("Error: \(response.result.error)")
                    return
                }
                print("id: \(json["id"]!); bar: \(json["bar"]!); baz: \(json["baz"]!)")
                /*
                 * output:
                 *
                 * id: 4; bar: dummy info; baz: smart info!
                 */
                
                /* DELETE deletes an existing record */
                Alamofire.request(fooEndpoint + "/\(json["id"]!)", method: .delete).responseJSON { response in
                    guard let json = response.result.value else {
                        print("DELETE Didn't get count as JSON object from API")
                        print("Error: \(response.result.error)")
                        return
                    }
                    print("Deleted \(json) records")
                    /*
                     * output:
                     *
                     * deleted 1 records
                     */
                }
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

