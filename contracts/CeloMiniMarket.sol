// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract CeloMiniMarket is ERC721, ERC721URIStorage, ERC721Burnable {
    using Strings for uint256;

    struct Product {
        uint256 tokenId;
        address vendor;
        string name;
        uint256 priceWei;     // price in cUSD smallest unit (18 decimals)
        string description;
        string imageData;     // base64 encoded image
        bool active;
        bool sold;
    }

    event ProductAdded(uint256 indexed tokenId, address indexed vendor, string name, uint256 priceWei);
    event ProductStatusToggled(uint256 indexed tokenId, bool active);
    event ProductPurchased(uint256 indexed tokenId, address indexed buyer, address indexed vendor, uint256 price);

    uint256 private _tokenIdCounter;
    mapping(uint256 => Product) private _products;
    uint256[] private _allTokenIds;

    constructor() ERC721("CeloMiniMarketProduct", "CMMP") {}

    function addProduct(
        string calldata name,
        uint256 priceWei,
        string calldata description,
        string calldata imageData
    ) external returns (uint256) {
        require(bytes(name).length > 0, "Name required");
        require(priceWei > 0, "Price must be > 0");
        require(bytes(imageData).length > 0, "Image required");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        // Mint NFT to vendor
        _safeMint(msg.sender, tokenId);

        // Create on-chain metadata
        string memory tokenURI = _generateTokenURI(tokenId, name, description, imageData);
        _setTokenURI(tokenId, tokenURI);

        // Store product data
        _products[tokenId] = Product({
            tokenId: tokenId,
            vendor: msg.sender,
            name: name,
            priceWei: priceWei,
            description: description,
            imageData: imageData,
            active: true,
            sold: false
        });

        _allTokenIds.push(tokenId);

        emit ProductAdded(tokenId, msg.sender, name, priceWei);
        return tokenId;
    }

    function purchaseProduct(uint256 tokenId) external payable {
        require(_products[tokenId].vendor != address(0), "Product not found");
        require(_products[tokenId].active, "Product not active");
        require(!_products[tokenId].sold, "Product already sold");
        require(msg.value >= _products[tokenId].priceWei, "Insufficient payment");

        Product storage product = _products[tokenId];
        address vendor = product.vendor;
        uint256 price = product.priceWei;

        // Mark as sold and inactive
        product.sold = true;
        product.active = false;

        // Transfer payment to vendor
        (bool sent, ) = payable(vendor).call{value: price}("");
        require(sent, "Payment failed");

        // Refund excess payment
        if (msg.value > price) {
            (bool refunded, ) = payable(msg.sender).call{value: msg.value - price}("");
            require(refunded, "Refund failed");
        }

        // Burn the NFT token
        _burn(tokenId);

        emit ProductPurchased(tokenId, msg.sender, vendor, price);
    }

    function toggleProduct(uint256 tokenId, bool active) external {
        require(_products[tokenId].vendor == msg.sender, "Only vendor");
        require(!_products[tokenId].sold, "Product already sold");
        _products[tokenId].active = active;
        emit ProductStatusToggled(tokenId, active);
    }

    function productsCount() external view returns (uint256) {
        return _allTokenIds.length;
    }

    function getProduct(uint256 tokenId) external view returns (
        uint256,
        address,
        string memory,
        uint256,
        string memory,
        string memory,
        bool,
        bool
    ) {
        require(_products[tokenId].vendor != address(0), "Product not found");
        Product memory p = _products[tokenId];
        return (p.tokenId, p.vendor, p.name, p.priceWei, p.description, p.imageData, p.active, p.sold);
    }

    function getActiveProducts() external view returns (Product[] memory) {
        uint256 count;
        for (uint256 i = 0; i < _allTokenIds.length; i++) {
            uint256 tokenId = _allTokenIds[i];
            if (_products[tokenId].active && !_products[tokenId].sold) {
                count++;
            }
        }
        
        Product[] memory out = new Product[](count);
        uint256 idx;
        for (uint256 i = 0; i < _allTokenIds.length; i++) {
            uint256 tokenId = _allTokenIds[i];
            if (_products[tokenId].active && !_products[tokenId].sold) {
                out[idx++] = _products[tokenId];
            }
        }
        return out;
    }

    function _generateTokenURI(
        uint256 tokenId,
        string memory name,
        string memory description,
        string memory imageData
    ) private pure returns (string memory) {
        string memory json = string(
            abi.encodePacked(
                '{"name":"',
                name,
                '","description":"',
                description,
                '","image":"',
                imageData,
                '","attributes":[{"trait_type":"Product ID","value":"',
                tokenId.toString(),
                '"}]}'
            )
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(bytes(json))
            )
        );
    }

    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
