# Category Artwork Cleanup

Created with the built-in image generation tool, using the existing category
illustrations as edit targets. Original files are retained. These are category
illustrations, not verified photographs of individual catalog SKUs.

## Outputs

- `categories-clean-v2.png`: edit of `categories.jpg`.
- `categories-extra-clean-v2.png`: edit of `categories-extra.jpg`.
- `categories-exploded-clean-v2.png`: edit of `categories-exploded.png`.

All outputs are 1536 x 1024 RGBA PNGs. Actual transparency was checked after
flattening inspection copies onto white. The source layouts are not perfectly
uniform grids, so `category-artwork.js` clips each subject to an individually
checked rectangle and preserves its aspect ratio. No foreground pixels above
alpha 25 touch any of the 24 crop boundaries. Consumers share this renderer:
homepage category cards, expanded cards, illustrative catalog thumbnails and
the catalog menus on both public preview pages.

## Prompts

### Main Sheet

Use case: background-extraction. Edit target: attached sheet of six machinery spare-part category photos. Clean production sprite sheet for an existing website, NOT a redesign. Keep exactly the same six objects, material detail, colors, angles and correct category order: row 1 engine, hydraulic pump, filter set; row 2 transmission axle, starter motor, bucket teeth. Output a 1536x1024 PNG on real transparent alpha, no white or gray floor, no painted checkerboard. Strict invisible 3 column by 2 row grid, each cell 512x512. Center each complete object group within its own cell with a minimum 32px EMPTY transparent margin on ALL four edges. Keep every object and every extremity fully intact, no crop. Remove all floor textures, contact shadows and stray marks between objects. No element or shadow may cross a cell boundary. Preserve the subjects and their silhouettes faithfully; do not add parts, labels, frames, grid lines, glow, text or watermark. The alpha must be completely empty along all outer edges and all cell boundaries; clean isolated product cutouts.

### Extra Sheet

Use case: background-extraction. Edit target: attached six-part sprite sheet. Preserve exactly the same six machinery part groups, colors, materials, fine details and views. Remove the white/gray background, floor and ALL shadows. Output real transparent alpha PNG 1536x1024, strict 3 columns by 2 rows of 512x512 square cells. Row 1: undercarriage roller/track group, fuel injection pump, wheel. Row 2: pins and bushings, seal rings, cabin door. IMPORTANT: reduce each complete subject to fit inside a centered 384x384 rectangle within its cell, leaving at least 64 pixels of completely transparent padding along EVERY cell edge. Uniform grid cell centers are (256,256), (768,256), (1280,256), (256,768), (768,768), (1280,768). Keep every extremity intact. Separate subjects never touch cell boundaries. No floor texture, no shadows, no stripes, no grid lines, no labels, no text, no glow or watermark. Preserve glass tint but remove the backdrop. This is a production sprite sheet, not a collage.

### Expanded Sheet

Use case: background-extraction. Edit target: the attached twelve-category exploded machinery parts image. Keep all twelve groups and all parts, materials, colors, perspectives faithfully unchanged. Remove ONLY the entire white floor, every gray contact shadow, background texture and stray marks. Return actual transparent alpha PNG with no floor shadows at all. Keep a strict invisible 3-column by 4-row grid, 1536x1024 output, each cell 512x256. Make each complete group smaller if needed, centered in its own cell with at least 24 pixels of fully transparent empty space on every cell edge. Nothing may touch or cross cell boundaries. Row 1: exploded engine, hydraulic pump, filters. Row 2: transmission axle, starter, bucket teeth and fasteners. Row 3: track roller and links, fuel injection pump, wheel and rim. Row 4: pins and bushings, seals, cabin door/glass. Preserve every component intact, no cropping. No background, no white/gray floor, no shadows, no checkerboard drawn into image, no labels, no text, no lines or frames, no watermark. Production website sprite, high-fidelity object cutouts.
