import Cell from "./Cell";

/* 
  Row component: A functional component that takes an `item` as a prop. 
  The `item` is expected to be an object, where each key-value pair represents a cell's data in a row.
*/

const Row = ({ item }) => {
    return (
        <tr>
            {/* 
              Use `Object.entries` to iterate over the `item` object.
              This returns an array of `[key, value]` pairs for each property in the object.
            */}
            {Object.entries(item).map(([key, value]) => {
                return (
                    /* 
                      Render the `Cell` component for each key-value pair.
                      `key` is used as the `key` prop to help React identify each component uniquely.
                      `cellData` is passed as a prop to `Cell`, where `value` is stringified into JSON format.
                    */
                    <Cell key={key} cellData={JSON.stringify(value)} />
                )
            })}
        </tr>
    )
}

export default Row;
