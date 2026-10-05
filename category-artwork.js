let categoryArtworkId = 0;

function categoryArtwork(index, expanded = false) {
  // Crop each subject separately: the source sheets are not evenly spaced grids.
  const compactRegions = [
    [0, 0, 536, 512], [536, 0, 504, 512], [1040, 0, 496, 512],
    [0, 512, 545, 512], [545, 512, 459, 512], [1004, 512, 532, 512],
    [0, 0, 530, 500], [530, 0, 520, 500], [1050, 0, 486, 500],
    [0, 500, 530, 524], [530, 500, 520, 524], [1050, 500, 486, 524]
  ];
  const expandedRegions = [
    [0, 0, 512, 278], [512, 0, 512, 278], [1024, 0, 512, 278],
    [0, 278, 512, 248], [512, 278, 512, 230], [1024, 278, 512, 230],
    [0, 526, 512, 270], [512, 508, 512, 276], [1024, 508, 512, 262],
    [0, 796, 512, 228], [512, 784, 512, 240], [1024, 770, 512, 254]
  ];
  const region = (expanded ? expandedRegions : compactRegions)[index];
  const source = expanded ? 'categories-exploded-clean-v2.png' : `categories${index >= 6 ? '-extra' : ''}-clean-v2.png`;
  const height = expanded ? 256 : 512;
  const scale = Math.min(512 / region[2], height / region[3]);
  const width = region[2] * scale;
  const fittedHeight = region[3] * scale;
  const clipId = `category-crop-${++categoryArtworkId}`;
  return `<svg class="category-sprite" viewBox="0 0 512 ${height}" aria-hidden="true" focusable="false"><defs><clipPath id="${clipId}"><rect x="${region[0]}" y="${region[1]}" width="${region[2]}" height="${region[3]}"/></clipPath></defs><g transform="translate(${(512 - width) / 2} ${(height - fittedHeight) / 2}) scale(${scale}) translate(${-region[0]} ${-region[1]})" clip-path="url(#${clipId})"><image href="assets/${source}" width="1536" height="1024"/></g></svg>`;
}
