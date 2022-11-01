

# Compared Performance of BigInt Vs Decimaljs Vs rmathjs

## Small Integer, i.e. max interger allowed by crpto module
Performed 1000000 (1 million) ops, table shows time chart. All number are in ms, and are performed on Mac M1 Pro Chip with node v16.17.0. 
Total Time number :  245.1073347441852
Total Time bigint :  314.8640373405069
Total Time decimal.js :  2992.104598244652
Total Time rmathjs@v1.js :  1856.2674515452236
<table>
  <th>
    <th>number</th>
    <th>bigint</th>
    <th>Decimal.js</th>
    <th>rmathjs@v1</th>
  </th>
  <tr>
    <th>init</th>
    <td>34.8973</td>
    <td>65.3227</td>
    <td>650.6814</td>
    <td>212.7962</td>
  <tr>

  <tr>
    <th>add</th>
    <td>35.2138</td>
    <td>35.1595</td>
    <td>103.6255</td>
    <td>242.3865</td>
  <tr>


  <tr>
    <th>sub</th>
    <td>35.3944</td>
    <td>34.6862</td>
    <td>120.40698</td>
    <td>237.4437</td>
  <tr>


  <tr>
    <th>mul</th>
    <td>35.3313</td>
    <td>52.2361</td>
    <td>546.3879</td>
    <td>228.6770</td>
  <tr>


  <tr>
    <th>div</th>
    <td>35.2244</td>
    <td>58.0151</td>
    <td>1501.8868</td>
    <td>866.3756</td>
  <tr>
  <tr>
    <th>total</th>
    <th>245.1073</th>
    <th>314.8640</th>
    <th>2992.1045</th>
    <th>1856.2674</td>
  <tr>
</table>


This chart shows **rmathjs@v1** outperforms **decimaljs** library mainly doing division operations. There is scope of improving performance of **rmathjs** while doing add / sub operations where decimaljs has edge.