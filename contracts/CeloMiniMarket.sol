// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CeloMiniMarket {
    struct Product {
        uint256 id;
        address vendor;
        string name;
        uint256 priceWei;     // price in cUSD smallest unit (18 decimals)
        string description;
        bool active;
    }

    event ProductAdded(uint256 indexed id, address indexed vendor, string name, uint256 priceWei);
    event ProductStatusToggled(uint256 indexed id, bool active);

    Product[] private _products;

    function addProduct(
        string calldata name,
        uint256 priceWei,
        string calldata description
    ) external returns (uint256) {
        require(bytes(name).length > 0, "Name required");
        require(priceWei > 0, "Price must be > 0");

        uint256 id = _products.length;
        _products.push(Product({
            id: id,
            vendor: msg.sender,
            name: name,
            priceWei: priceWei,
            description: description,
            active: true
        }));

        emit ProductAdded(id, msg.sender, name, priceWei);
        return id;
    }

    function toggleProduct(uint256 id, bool active) external {
        require(id < _products.length, "Invalid id");
        Product storage p = _products[id];
        require(p.vendor == msg.sender, "Only vendor");
        p.active = active;
        emit ProductStatusToggled(id, active);
    }

    function productsCount() external view returns (uint256) {
        return _products.length;
    }

    function getProduct(uint256 id) external view returns (
        uint256,
        address,
        string memory,
        uint256,
        string memory,
        bool
    ) {
        require(id < _products.length, "Invalid id");
        Product memory p = _products[id];
        return (p.id, p.vendor, p.name, p.priceWei, p.description, p.active);
    }

    function getActiveProducts() external view returns (Product[] memory) {
        uint256 n = _products.length;
        uint256 count;
        for (uint256 i = 0; i < n; i++) {
            if (_products[i].active) count++;
        }
        Product[] memory out = new Product[](count);
        uint256 idx;
        for (uint256 i = 0; i < n; i++) {
            if (_products[i].active) out[idx++] = _products[i];
        }
        return out;
    }
}
