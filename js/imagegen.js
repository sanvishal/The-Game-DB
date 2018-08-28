//window.onload = function onLoad() {
for (i = 0; i < master.length; i++) {
    $("#progress-" + i).radialIndicator({
        barColor: {
            0: '#F44336',
            5: '#E91E63',
            7: '#673AB7',
            10: '#8BC34A'
        },
        barWidth: 10,
        minValue: 0,
        maxValue: 10,
        initValue: master[i].score,
        roundCorner: true,
        format: '## /10',
        radius: 40
    });
}
//};