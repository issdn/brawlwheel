const configBase = {
  padding: 10,
  fontWeight: 900,
  segmentColors: ["#ff9801", "#ffcc01"],
  textColor: "white",
  textBorderColor: "black",
  fontFamily: "Nougat",
  accentColor: "black",
  duration: 5000,
  fontBorderWidth: 1,
  accentBorderWidth: 1,
  onAnimationStart: () => {},
  onAnimationEnd: () => {},
};

type ConfigType = Partial<{
  [k in keyof typeof configBase]: (typeof configBase)[k];
}>;

const breakPoint = 768;

export default class WheelRenderer {
  private canvas: HTMLCanvasElement;
  private words: string[];
  private config: typeof configBase;
  private ctx: CanvasRenderingContext2D;
  private centerX: number;
  private centerY: number;
  private radius: number;
  private numSegments: number;
  private angleStep: number = 6;
  private startTime: number = 0;
  private fontStyle: string;
  private winningAngle: number = 0;
  private lastSegmentAngle: number = 0;
  private finalSegmentAngle: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    words: string[],
    config: ConfigType = {}
  ) {
    this.config = { ...configBase, ...config };
    this.canvas = canvas;
    this.words = words;
    this.ctx = this.getContext();
    this.numSegments = this.words.length;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = Math.min(this.centerX, this.centerY) - this.config.padding;
    this.fontStyle = `${this.config.fontWeight} ${24}px ${
      this.config.fontFamily
    }`;
    this.config.fontBorderWidth = 1;
    this.config.accentBorderWidth = 1;
    this.calculateSizing();
    this.resize();
  }

  public resize = () => {
    this.calculateSizing();
    this.preDraw();
  };

  public preDraw() {
    document.fonts.load(this.fontStyle).then(() => {
      this.drawWheel(0);
    });
  }

  public spin() {
    this.config.onAnimationStart();
    const winnerIndex = this.calculateWinnerIndex();
    this.setWinningAngle(winnerIndex);
    this.animate(0);
    return winnerIndex;
  }

  private getContext() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }
    return ctx;
  }

  private calculateSizing() {
    this.canvas.width = this.canvas.height =
      Math.min(window.innerWidth, window.innerHeight) - this.config.padding * 2;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = Math.min(this.centerX, this.centerY) - this.config.padding;
    this.angleStep = (2 * Math.PI) / this.numSegments;
    this.fontStyle = `${this.config.fontWeight} ${
      this.words.length < 24
        ? (this.radius / 24) * 2.5
        : (this.radius / this.words.length) * 3
    }px ${this.config.fontFamily}`;
    this.config.accentBorderWidth = this.canvas.width < breakPoint ? 1 : 4;
    this.config.fontBorderWidth = 1;
  }

  private drawSegment(word: string, index: number) {
    // Draw wheel
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY);
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      index * this.angleStep - Math.PI / 2,
      (index + 1) * this.angleStep - Math.PI / 2
    );
    this.ctx.closePath();
    this.ctx.fillStyle = this.config.segmentColors[index % 2];
    this.ctx.fill();
    this.ctx.lineWidth = this.config.accentBorderWidth;
    this.ctx.stroke();
    this.ctx.restore();
    // Draw text
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate((index + 0.5) * this.angleStep - Math.PI / 2);
    this.ctx.font = this.fontStyle;
    this.ctx.lineWidth = this.config.fontBorderWidth;
    this.ctx.strokeStyle = this.config.textBorderColor;
    this.ctx.fillStyle = this.config.textColor;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      word,
      this.radius - this.ctx.measureText(word).width / 2 - 10,
      0
    );
    this.ctx.strokeText(
      word,
      this.radius - this.ctx.measureText(word).width / 2 - 10,
      0
    );
    this.ctx.restore();
  }

  private drawInnerCircle() {
    const innerCircleRadius = this.radius / 4;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY);
    this.ctx.arc(this.centerX, this.centerY, innerCircleRadius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fillStyle = this.config.accentColor;
    this.ctx.fill();
    this.ctx.restore();
    // Draw SPIN text in the middle
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.font = `${this.config.fontWeight} ${innerCircleRadius / 1.5}px ${
      this.config.fontFamily
    }`;
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = this.config.textColor;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("SPIN", 0, 0);
    this.ctx.restore();
  }

  private drawArrow() {
    const arrowWidth = this.canvas.width / 30;
    const arrowHeight = this.canvas.width / 20;
    const arrowTip = 10;

    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX - arrowWidth / 2, 0);
    this.ctx.lineTo(this.centerX + arrowWidth / 2, 0);
    this.ctx.lineTo(this.centerX + arrowWidth / 2, arrowHeight - arrowTip);
    this.ctx.lineTo(this.centerX, arrowHeight);
    this.ctx.lineTo(this.centerX - arrowWidth / 2, arrowHeight - arrowTip);
    this.ctx.closePath();

    this.ctx.fillStyle = "#000";
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  private calculateWinnerIndex(): number {
    return Math.floor(Math.random() * this.words.length);
  }

  private animate(timestamp: number = 0) {
    this.setInitialTimestampIfNeeded(timestamp);
    const progress = this.calculateProgress(timestamp);
    if (progress < 1) {
      this.drawWheel(progress);
      requestAnimationFrame((timestamp) => this.animate(timestamp));
    } else {
      this.drawWheel(1);
      this.startTime = 0;
      this.lastSegmentAngle = -this.finalSegmentAngle;
      this.config.onAnimationEnd();
    }
  }

  private setInitialTimestampIfNeeded(timestamp: number) {
    if (this.startTime === 0) {
      this.startTime = timestamp;
    }
  }

  private calculateProgress(timestamp: number): number {
    const elapsed = timestamp - this.startTime;
    return Math.min(elapsed / this.config.duration, 1);
  }

  private drawWheel(progress: number) {
    const currentAngle = this.calculateCurrentAngle(progress);
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(currentAngle);
    this.ctx.translate(-this.centerX, -this.centerY);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.words.forEach((word, i) => {
      this.drawSegment(word, i);
    });

    this.ctx.restore();
    this.drawInnerCircle();
    this.drawArrow();
  }

  private calculateCurrentAngle(progress: number): number {
    const easing = this.easeInOutQuint(progress);
    return this.lastSegmentAngle + easing * this.winningAngle;
  }

  /**
   * @param winnerIndex the index of the winning segment
   */
  private setWinningAngle(winnerIndex: number) {
    const visualShift = this.calculateVisualShift();
    const rotations = 3;
    const segmentAngle = this.angleStep * winnerIndex;
    this.winningAngle =
      2 * Math.PI * rotations -
      segmentAngle -
      this.lastSegmentAngle -
      visualShift;
    this.finalSegmentAngle = segmentAngle + visualShift;
  }

  /**
   * To make it so that the arrow doesn't always stop at the edge of two segments.
   * @returns a random number between 15% and 85% of the angle step
   */
  private calculateVisualShift = () => {
    return (
      (15 / 100) * this.angleStep +
      ((Math.random() * 70) / 100) * this.angleStep
    );
  };

  easeInOutQuint = (t: number) => {
    return t < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
  };
}
