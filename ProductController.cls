public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static PaginationResult getProducts(Integer pageNumber, Integer pageSize) {
        PaginationResult result = new PaginationResult();

        // Query for total number of records
        Integer totalRecords = [SELECT COUNT() FROM Product2];

        // Calculate start and end index of records to retrieve
        Integer startIndex = (pageNumber - 1) * pageSize;
        Integer endIndex = startIndex + pageSize - 1;

        // Query for contacts using LIMIT and OFFSET
        List<Product2> products = [SELECT Id, Name, Description, IsActive, ProductCode FROM Product2 ORDER BY Name ASC LIMIT :pageSize OFFSET :startIndex];

        // Set result properties
        result.products = products;
        result.totalRecords = totalRecords;

        return result;
    }

    public class PaginationResult {
        @AuraEnabled public List<Product2> products;
        @AuraEnabled public Integer totalRecords;
    }
}