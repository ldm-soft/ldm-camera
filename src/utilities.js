export const drawRect = (detections, ctx) =>{
  // Chạy vòng lặp qua tất cả các đối tượng sẽ vẽ
  detections.forEach((prediction, index) => {

    // Lấy thuộc tính hộp viền hiển thị của đối tượng
    const [x, y, width, height] = prediction['bbox']; 
    const text = `[${index + 1}]`;//prediction['class']; 

    // Lấy màu ngẫu nhiên cho các ô viền vẽ đối tượng
    const color = Math.floor(Math.random()*16777215).toString(16);
    ctx.strokeStyle = '#' + color
    ctx.font = '18px Arial';

    // thực hiện vẽ các hộp báo nhận diện đối tượng ra màn hình.
    ctx.beginPath();   
    ctx.fillStyle = '#' + color
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height); 
    ctx.stroke();
  });
}
