export async function fetchData(trend) {
    const response = await fetch(`http://localhost:8000/api/currencies?trend=` + trend)
    const data = await response.json()
    return data;
}
