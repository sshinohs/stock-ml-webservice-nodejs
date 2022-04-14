let ddong = 'ddong'
let data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Price',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
}

let type = 'bar';
let options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
let ham = JSON.parse(JSON.stringify(data));
// document.write(ham);
// document.write(data);
// document.write(type);
const ctx = document.getElementById('myChart');
let myChart = new Chart(ctx, {type: type, data: ham, options: options});
const config = {
    type: 'line',
    data: data,
    options: {}
};