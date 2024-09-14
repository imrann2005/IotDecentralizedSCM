// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductProvenance {

    struct Product {
        string name;
        string rfid;
        string origin;
        uint8 currentCheckpoint; // Track the index of the current checkpoint
        address owner;
        uint256[] timestamps;
        string[] locations;
        bool isShipped; // Flag to indicate if the product is shipped
    }

    // Added 15 checkpoints for a more detailed supply chain workflow
    string[15] public checkpoints = [
        "Manufacturer's Warehouse",
        "Quality Control",
        "Packaging",
        "Manufacturer Dispatch",
        "Supplier Warehouse",
        "Customs Clearance",
        "Loading for Shipment",
        "In Transit",
        "Destination Customs",
        "Supplier Dispatch",
        "Local Warehouse",
        "Out For Local Delivery",
        "Delivered",
        "Returned",
        "Disposed"
    ];

    mapping(string => Product) public products;

    event ProductRegistered(string rfid, string name, string origin);
    event LocationUpdated(string rfid, string newLocation, uint256 timestamp);
    event ProductShipped(string rfid);

    function registerProduct(string memory _name, string memory _rfid, string memory _origin) public {
        require(bytes(products[_rfid].rfid).length == 0, "Product already registered.");

        // Initialize product details
        products[_rfid].name = _name;
        products[_rfid].rfid = _rfid;
        products[_rfid].origin = _origin;
        products[_rfid].currentCheckpoint = 0; // Start at the first checkpoint
        products[_rfid].owner = msg.sender;
        products[_rfid].isShipped = false; // Product is not yet shipped

        // Log the origin
        products[_rfid].timestamps.push(block.timestamp);
        products[_rfid].locations.push(checkpoints[0]); // Initial location

        emit ProductRegistered(_rfid, _name, _origin);
    }

    function updateLocation(string memory _rfid) public {
        require(bytes(products[_rfid].rfid).length != 0, "Product not registered.");
        require(msg.sender == products[_rfid].owner, "Only the owner can update the location.");
        require(!products[_rfid].isShipped, "Product has already been shipped.");

        uint8 currentCheckpoint = products[_rfid].currentCheckpoint;

        // Increment to the next checkpoint if not the last one
        if (currentCheckpoint < checkpoints.length - 1) {
            products[_rfid].currentCheckpoint += 1;
            string memory newLocation = checkpoints[products[_rfid].currentCheckpoint];
            
            products[_rfid].locations.push(newLocation);
            products[_rfid].timestamps.push(block.timestamp);
            
            emit LocationUpdated(_rfid, newLocation, block.timestamp);
        }

        // Mark product as shipped if it's at the final checkpoint
        if (products[_rfid].currentCheckpoint == checkpoints.length - 1) {
            products[_rfid].isShipped = true;
            emit ProductShipped(_rfid);
        }
    }

    function getProductHistory(string memory _rfid) public view returns (string[] memory, uint256[] memory) {
        return (products[_rfid].locations, products[_rfid].timestamps);
    }

    function getProductInfo(string memory _rfid) public view returns (string memory, string memory, string memory, address, bool) {
        Product memory product = products[_rfid];
        string memory currentLocation = checkpoints[product.currentCheckpoint];
        return (product.name, product.rfid, currentLocation, product.owner, product.isShipped);
    }
}
