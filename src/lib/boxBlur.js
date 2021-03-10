var mul_table = [
        512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
        454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
        482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
        437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
        497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
        320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
        446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
        329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
        505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
        399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
        324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
        268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
        451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
        385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
        332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
        289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];


var shg_table = [
       9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
    17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];


function boxBlur( context, top_x, top_y, width, height, radius, iterations ){
  if ( isNaN(radius) || radius < 1 ) return;

  radius |= 0;

  if ( isNaN(iterations) ) iterations = 1;
  iterations |= 0;
  if ( iterations > 3 ) iterations = 3;
  if ( iterations < 1 ) iterations = 1;

  var imageData = context.getImageData( top_x, top_y, width, height );
  var pixels = imageData.data;

  var rsum,gsum,bsum,asum,x,y,i,p,p1,p2,yp,yi,yw,idx,pa;
  var wm = width - 1;
    var hm = height - 1;
    var wh = width * height;
  var rad1 = radius + 1;

  var mul_sum = mul_table[radius];
  var shg_sum = shg_table[radius];

  var r = [];
    var g = [];
    var b = [];
  var a = [];

  var vmin = [];
  var vmax = [];

  while ( iterations-- > 0 ){
    yw = yi = 0;

    for ( y=0; y < height; y++ ){
      rsum = pixels[yw]   * rad1;
      gsum = pixels[yw+1] * rad1;
      bsum = pixels[yw+2] * rad1;
      asum = pixels[yw+3] * rad1;


      for( i = 1; i <= radius; i++ ){
        p = yw + (((i > wm ? wm : i )) << 2 );
        rsum += pixels[p++];
        gsum += pixels[p++];
        bsum += pixels[p++];
        asum += pixels[p]
      }

      for ( x = 0; x < width; x++ ) {
        r[yi] = rsum;
        g[yi] = gsum;
        b[yi] = bsum;
        a[yi] = asum;

        if( y==0) {
          vmin[x] = ( ( p = x + rad1) < wm ? p : wm ) << 2;
          vmax[x] = ( ( p = x - radius) > 0 ? p << 2 : 0 );
        }

        p1 = yw + vmin[x];
        p2 = yw + vmax[x];

        rsum += pixels[p1++] - pixels[p2++];
        gsum += pixels[p1++] - pixels[p2++];
        bsum += pixels[p1++] - pixels[p2++];
        asum += pixels[p1]   - pixels[p2];

        yi++;
      }
      yw += ( width << 2 );
    }

    for ( x = 0; x < width; x++ ) {
      yp = x;
      rsum = r[yp] * rad1;
      gsum = g[yp] * rad1;
      bsum = b[yp] * rad1;
      asum = a[yp] * rad1;

      for( i = 1; i <= radius; i++ ) {
        yp += ( i > hm ? 0 : width );
        rsum += r[yp];
        gsum += g[yp];
        bsum += b[yp];
        asum += a[yp];
      }

      yi = x << 2;
      for ( y = 0; y < height; y++) {

        pixels[yi+3] = pa = (asum * mul_sum) >>> shg_sum;
        if ( pa > 0 )
        {
          pa = 255 / pa;
          pixels[yi]   = ((rsum * mul_sum) >>> shg_sum) * pa;
          pixels[yi+1] = ((gsum * mul_sum) >>> shg_sum) * pa;
          pixels[yi+2] = ((bsum * mul_sum) >>> shg_sum) * pa;
        } else {
          pixels[yi] = pixels[yi+1] = pixels[yi+2] = 0;
        }
        if( x == 0 ) {
          vmin[y] = ( ( p = y + rad1) < hm ? p : hm ) * width;
          vmax[y] = ( ( p = y - radius) > 0 ? p * width : 0 );
        }

        p1 = x + vmin[y];
        p2 = x + vmax[y];

        rsum += r[p1] - r[p2];
        gsum += g[p1] - g[p2];
        bsum += b[p1] - b[p2];
        asum += a[p1] - a[p2];

        yi += width << 2;
      }
    }
  }

  context.putImageData( imageData, top_x, top_y );

}


 export default boxBlur
