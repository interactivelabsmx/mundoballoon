import { gql, useQuery, NetworkStatus } from '@apollo/client';
import ErrorMessage from './ErrorMessage';

export const ALL_POSTS_QUERY = gql`
  fragment categoryInfo on ProductCategory {
    productCategoryId
    name
    description
  }

  fragment mediaInfo on ProductVariantMedium {
    productVariantMediaId
    mediaType
    url
    quality
  }

  fragment varitanInfo on ProductVariant {
    productVariantId
    sku
    variantValueId
    productId
    name
    description
    price
    compareAtPrice
    weight
    taxable
    storeOnly
    isBundle
    variant {
      value
    }
    media {
      ...mediaInfo
    }
  }

  fragment productInfo on Product {
    productId
    name
    description
    price
    category {
      ...categoryInfo
    }
    variants {
      ...varitanInfo
    }
  }

  query allSiteProducts(
    $products: Boolean = false
    $featuredProducts: Boolean = false
    $bestSellingProducts: Boolean = false
    $newestProducts: Boolean = false
  ) {
    site {
      products @include(if: $products) {
        ...productInfo
      }
      featuredProducts @include(if: $featuredProducts) {
        ...productInfo
      }
      bestSellingProducts @include(if: $bestSellingProducts) {
        ...productInfo
      }
      newestProducts @include(if: $newestProducts) {
        ...productInfo
      }
    }
  }

`;

export const allPostsQueryVars = {
  featuredProducts: true,
};

export default function PostList() {
  const { loading, error, data, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      variables: allPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading && !loadingMorePosts) return <div>Loading</div>;

  const { site } = data;
  const { featuredProducts } = site;

  return (
    <section>
      <ul>
        {featuredProducts.map((post, index) => (
          <li key={post.productId}>
            <div>
              <span>{index + 1}. </span>
              <a href={post.productId}>{post.description}</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
