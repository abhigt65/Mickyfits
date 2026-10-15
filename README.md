# Mickyfits Affiliate Fashion Website

## Customer journey
Home → Shop → Categories → Product Page → Wishlist → Retailer/Affiliate Link

There is **no direct cart or checkout**, because Mickyfits is an affiliate site. The customer clicks `SHOP THIS PRODUCT` and completes the purchase on the retailer's website.

## Replace demo affiliate links
Open `index.html`, find the `products` array, and replace each `url:` value with your real affiliate tracking URL.

Example:
`url:"https://example.com/affiliate/tee"`

Replace with your actual partner link.

## Admin/Product Management
For an affiliate business, the admin area should manage:
- Product title
- Category
- Image
- Price
- Retailer
- Affiliate URL
- Description
- Tags
- Featured/new status

It should not manage customer orders unless you later add direct selling.

The current prototype uses CSS fashion silhouettes so it works without external image files. In the production version, replace these with your actual affiliate product images.
