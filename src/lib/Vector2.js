class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(point) {
    return new Vector2(this.x + point.x, this.y + point.y);
  }

  plusEquals(point) {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  minus(point) {
    return new Vector2(this.x - point.x, this.y - point.y);
  }

  minusEquals(point) {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

  scale(scalar) {
    return new Vector2(scalar * this.x, scalar * this.y);
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  length() {
    return Math.sqrt(this.x**2 + this.y**2);
  }

  unit() {
    return this.scale(1 / this.length());
  }
}


export default Vector2
