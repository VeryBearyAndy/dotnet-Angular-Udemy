using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersWithCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersWithCountSpecification(ProductSpecParams ProductParams)
                : base(x =>
                (!ProductParams.BrandId.HasValue || x.ProductBrandId == ProductParams.BrandId) && 
                (!ProductParams.TypeId.HasValue || x.ProductTypeId == ProductParams.TypeId)
            )
        {
        }
    }
}