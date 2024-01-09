export const convertIsoToFormattedData = (isoData:string) =>
{
    const isoDate = isoData
    const dateObject = new Date(isoDate)
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = dateObject.toLocaleDateString('en-US', options)
    return formattedDate
}