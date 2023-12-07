export default function color (index)
{
    let Red = Math.round((255 * index) / 30);
    let Green = 255 - Red;
    let Color = `rgb(${Red}, ${Green}, 0)`;
    let RankStyle = { borderColor: Color };
    return (RankStyle);
}
