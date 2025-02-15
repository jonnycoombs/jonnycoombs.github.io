let music = document.querySelector(".music"),
  musicAud = document.querySelector(".music audio"),
  hour = document.querySelector(".hour"),
  min = document.querySelector(".min"),
  second = document.querySelector(".second"),
  page1 = document.querySelector(".index"),
  page2 = document.querySelector(".fire"),
  canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  fireAudio = document.querySelectorAll('.fireSound audio'),
  btn = document.querySelector(".fence .p2")
//--------------------------------------------------------------
// canvas All code is done with the image wrapped
loadImg(['img/bug.png', 'img/new.png', 'img/ni.png', 'img/tuofa.png','img/fz.png',]).then((imgArr) => {
  // --------------------------------------------------------------

  window.onload = function () {
    init();
  }
  // Music playing button
  music.onclick = function () {
    // 判断当前是否在播放
    if (musicAud.paused) {
      // Click to start playback
      this.className = "music run"
      musicAud.play()

    } else {
      // Pause
      this.className = "music"
      musicAud.pause()
    }
  }
  // Click the button to advance to the fireworks screen
  btn.onclick = function () {
    page1.style.display = "none"
    page2.style.display = "block"
    clearInterval(timer1)
    // Initial Fireworks interface
    initFire()
  }

  // Calculate the countdown
  let timer1 = setInterval(() => {
    let nowTime = new Date(),
      future = new Date("2025/01/29 00:00"),
      // Get time difference
      times = future - nowTime,
        // Work out hours, minutes and seconds
      h = Math.floor(times / (3600 * 1000)),
      m = (Math.floor(times % (3600 * 1000) / (60 * 1000)) + '').padStart(2, 0),
      s = (Math.floor(times % (60 * 1000) / 1000) + "").padStart(2, 0);
    hour.innerText = h
    min.innerText = m
    second.innerText = s

    if (s == "00" && h == "00" && m == "00") {
      page1.style.display = "none"
      page2.style.display = "block"
      clearInterval(timer1)
      // Start Fireworks
      initFire()
    }
  }, 1000)

  // Initialize Front page
  function init() {
    // Play Music
    musicAud.play()
    // Display the timer by 1 second
    let nowTime = new Date(),
      future = new Date("2025.01.29"),
      times = future - nowTime,
      h = Math.floor(times / (3600 * 1000)),
      m = (Math.floor(times % (3600 * 1000) / (60 * 1000)) + '').padStart(2, 0),
      s = (Math.floor(times % (60 * 1000) / 1000) + "").padStart(2, 0);
    hour.innerText = h
    min.innerText = m
    second.innerText = s
  }

  // 初始烟花页面
  // 首页隐藏 再初始化 烟花页
  function initFire() {
    // 爆炸声音
    for (let i = 0; i < fireAudio.length; i++) {
      fireAudio[i].currentTime = i
    }
    // 获取宽高
    let width = window.innerWidth,
      height = window.innerHeight
    // 设置宽高
    canvas.width = width
    canvas.height = height
    // 运动小球
    let balls = [],
      timer2 = null,
      count = 0,
      ballAll = 5,
      // 祝福词个数
      textAll = 5,
      // 祝福词坐标
      textPos = [
        { x: width / 4, y: height / 4 + 30 },
        { x: width / 4 * 3, y: height / 4 - 30 },
        { x: width / 2, y: height / 2 },
        { x: width / 4, y: height / 4 * 3 },
        { x: width / 4 * 3, y: height / 4 * 3 + 50 },
      ],
      // 爆炸数组
      fires = [],
      // 图片粒子点数组
      points1 = getImgInfo(imgArr[0], 4),
      points2 = [],
      textFires = []
    if (imgArr.length > 1) {
      for (let i = 1; i < imgArr.length; i++) {
        const imgInfo = getImgInfo(imgArr[i], 2);
        console.log("getImgInfo output:", imgInfo);  // Debugging log
        points2.push(imgInfo);
      }
    } else {
      console.error("imgArr does not have enough elements to populate points2.");
    }
    timer2 = setInterval(() => {
      if (count == ballAll) {
        // 小球到达总数 关闭计数器 清空
        clearInterval(timer2)
        count = 0
        timer = null
        // ----------------------
        balls.push(
          new Ball({
            r: 6,
            x: width / 2,
            y: height,
            vx: 0,
            vy: -10,
            end() {
              if (this.vy > 1.5) {
                balls.splice(balls.indexOf(this), 1)
                // 爆炸 
                for (let i = 0; i < 60; i++) {
                  let power = Math.random() * 10
                  let vx = Math.cos(i * 6 * Math.PI / 180) * power
                  let vy = Math.sin(i * 6 * Math.PI / 180) * power
                  fires.push(
                    new Fire({
                      r: 3,
                      x: this.x,
                      y: this.y,
                      vx: vx,
                      vy: vy,
                      g: 0.05,
                      end() {
                        if (this.life < 10) {
                          fires.splice(fires.indexOf(this), 1)
                        }
                      }
                    })
                  )
                }
                // 加文字 新年快乐
                for (let i = 0; i < points1.length; i++) {
                  let power = 0.05,
                    vx = (points1[i].x - points1.w / 2) * power,
                    vy = (points1[i].y - points1.h / 2) * power;
                  textFires.push(
                    new TextFires({
                      x: this.x,
                      y: this.y,
                      vx: vx,
                      vy: vy,
                      g: 0.03,
                      life: 200,
                      end() {
                        if (this.life < 10) {
                          textFires.splice(textFires.indexOf(this), 1)
                        }
                      }
                    })
                  )
                }
                // 祝福语
                timer3 = setInterval(() => {
                  if (count == textAll) {
                    clearInterval(timer3);
                    count = 0
                    timer3 = null
                    // 显示分享层
                    // setTimeout(() => {
                    //   share.style.display = "block"
                    // }, 5000)
                  } else {
                    count++
                    // --------------------
                    // 添加实例
                    let nowPos = textPos.pop();
                    let power = 0.01
                    let vx = (nowPos.x - width / 2) * power
                    let vy = (nowPos.y - height) * power
                    balls.push(
                      new Ball({
                        x: width / 2,
                        y: height,
                        r: 3,
                        vx: vx,
                        vy: vy,
                        tx: nowPos.x,
                        ty: nowPos.y,
                        index: count - 1,
                        g: 0,
                        end() {
                          if (this.y - this.ty < 0) {
                            balls.splice(balls.indexOf(this), 1)
                            // 加爆炸
                            for (let i = 0; i < 60; i++) {
                              let power = Math.random() * 10
                              let vx = Math.cos(i * 6 * Math.PI / 180) * power
                              let vy = Math.sin(i * 6 * Math.PI / 180) * power
                              fires.push(
                                new Fire({
                                  r: 2,
                                  x: this.x,
                                  y: this.y,
                                  vx: vx,
                                  vy: vy,
                                  g: 0,
                                  life: 300,
                                })
                              )
                            }
                            // 加祝福语
                            if (points2[this.index] && Array.isArray(points2[this.index])) {
                            for (let i = 0; i < points2[this.index].length; i++) {
                              let power = 0.05,
                                vx = (points2[this.index][i].x - points2[this.index].w / 2) * power,
                                vy = (points2[this.index][i].y - points2[this.index].h / 2) * power;
                              textFires.push(
                                new TextFires({
                                  x: this.x,
                                  y: this.y,
                                  vx: vx,
                                  vy: vy,
                                  g: 0,
                                  life: 300,
                                  r: 1
                                })
                              )
                            }
                            } else {
                              console.error('points2[this.index] is undefined or not an array:', points2[this.index]);
                            }
                          }
                        }

                      })
                    )
                    // --------------------
                  }
                }, 300)

              }
            }
          })
        )
        // -----------------------
      } else {
        count++
        // ------------------------
        // 添加小球 添加实例
        balls.push(
          new Ball({
            r: 3,
            x: Math.random() * width / 3 + width / 3,
            y: height,
            vx: Math.random() * 2 - 1,
            vy: -Math.random() * 2 - 9,
            end() {
              // 小球下落时  把小球从数组中删除
              if (this.vy > 1.5) {
                balls.splice(balls.indexOf(this), 1)
                // 开始爆炸 
                let size = Math.random() * 10
                for (let i = 0; i < 60; i++) {
                  let power = Math.random() * size
                  let vx = Math.cos(i * 6 * Math.PI / 180) * power
                  let vy = Math.sin(i * 6 * Math.PI / 180) * power
                  fires.push(
                    new Fire({
                      r: 3,
                      x: this.x,
                      y: this.y,
                      vx: vx,
                      vy: vy,
                      g: 0.05,
                      end() {
                        if (this.life < 10) {
                          fires.splice(fires.indexOf(this), 1)
                        }
                      }
                    })
                  )
                }
              }
            }
          })
        )
        // ------------------------
      }
    }, 1000)
    // 监听 小球
    loop()
    function loop() {
      // 清除运动轨迹
      if (balls.length) {
        for (let i = 0; i < fireAudio.length; i++) {
          fireAudio[i].muted = false
        }
        ctx.fillStyle = 'rgba(185,38,28,.2)'
        ctx.fillRect(0, 0, width, height)
      } else {
        ctx.fillStyle = 'rgba(185,38,28)'
        ctx.fillRect(0, 0, width, height)
        // 关闭爆炸声音
        for (let i = 0; i < fireAudio.length; i++) {
          fireAudio[i].muted = true
        }
      }

      for (let i = 0; i < balls.length; i++) {
        // 调用每个小球的实例方法
        balls[i].update()
        balls[i].render()
      }
      for (let i = 0; i < fires.length; i++) {
        // 调用每个小球的实例方法
        fires[i].update()
        fires[i].render()
      }
      for (let i = 0; i < textFires.length; i++) {
        textFires[i].update();
        textFires[i].render();
      }
      // 一秒执行60帧 递归调用
      requestAnimationFrame(loop)
    }
    // class  小球类
    class Ball {
      constructor(options) {
        // 设置默认参数
        this.settings = Object.assign({
          color: "yellow",
          r: 5,
          g: 0.1,
          end() { }
        }, options);
        // 将 this setting内容 挂载到 this 上
        for (let attr in this.settings) {
          this[attr] = this.settings[attr]
        }
      }
      // 更新方法
      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += this.g
      }
      // 重绘方法
      render() {
        ctx.beginPath();
        ctx.fillStyle = this.color
        // 弧度角度 2π=360
        ctx.arc(this.x, this.y, this.r, 0, 360 * Math.PI / 180);
        ctx.closePath();
        ctx.fill();
        this.end()
      }
    }
    // class Fire爆炸小球
    class Fire {
      constructor(options) {
        // 设置默认参数
        this.settings = Object.assign({
          color: "yellow",
          r: 5,
          g: 0.1,
          fs: 0.95,
          life: 100,
          end() { }
        }, options);
        // 将 this setting内容 挂载到 this 上
        for (let attr in this.settings) {
          this[attr] = this.settings[attr]
        }
      }
      // 更新方法
      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += this.g
        this.vx *= this.fs
        this.vy *= this.fs
        if (this.life > 0 && this.life < 300) {
          this.life--
        }
      }
      // 重绘方法
      render() {
        ctx.beginPath();
        ctx.fillStyle = this.color
        // 弧度角度 2π=360
        ctx.arc(this.x, this.y, this.r * Math.min(this.life, 100) / 100, 0, 360 * Math.PI / 180);
        ctx.closePath();
        ctx.fill();
        this.end()
      }
    }

    // 获取图片的信息
    function getImgInfo(img, level = 5) {
      let width = img.width
      let height = img.height
      let points = [];
      let x = Math.floor(width / level)
      let y = Math.floor(height / level)
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath();
      ctx.drawImage(img, 0, 0);
      ctx.closePath();
      imgData = ctx.getImageData(0, 0, width, height)
      ctx.clearRect(0, 0, width, height)
      points.w = width;
      points.h = height;

      for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
          let color = getImgColor(imgData, j * level, i * level);
          if (color[0] == 252) {
            points.push({ x: j * level, y: i * level })
          }
        }
      }


      return points
    }
    // 根据颜色 筛选像素点
    function getImgColor(imgData, x, y) {
      let w = imgData.width
      let h = imgData.height
      let d = imgData.data
      let color = [];
      color[0] = d[(y * w + x) * 4]
      color[1] = d[(y * w + x) * 4 + 1]
      color[2] = d[(y * w + x) * 4 + 2]
      color[3] = d[(y * w + x) * 4 + 3]
      return color
    }

    // 烟花文字类
    class TextFires {
      constructor(options) {
        // 设置默认参数
        this.settings = Object.assign({
          color: "yellow",
          r: 2,
          g: 0.1,
          fs: 0.95,
          life: 100,
          end() { }
        }, options);
        // 将 this setting内容 挂载到 this 上
        for (let attr in this.settings) {
          this[attr] = this.settings[attr]
        }
      }
      // 更新方法
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.life < 100) {
          this.vy += this.g
        }
        this.vx *= this.fs
        this.vy *= this.fs
        if (this.life > 0 && this.life < 300) {
          this.life--
        }
      }
      // 重绘方法
      render() {
        ctx.beginPath();
        ctx.fillStyle = this.color
        // 弧度角度 2π=360
        ctx.arc(this.x, this.y, this.r * Math.min(this.life, 100) / 100, 0, 360 * Math.PI / 180);
        ctx.closePath();
        ctx.fill();
        this.end()
      }
    }
  }

})


// 加载图片
function loadImg(arr) {
  let promiseArr = [];

  for (let i = 0; i < arr.length; i++) {
    let promise = new Promise((resolve, reject) => {
      let img = new Image();
      img.src = arr[i]
      img.onload = function () {
        resolve(img)
      }
    })
    promiseArr.push(promise);
  }

  return Promise.all(promiseArr);
}

