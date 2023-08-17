import { Link } from "react-router-dom";
import { useProfileController } from "./useProfileController"

export function Profile() {

  const { userData } = useProfileController();

  return (
    <div className="w-full h-full bg- flex flex-col items-center justify-center gap-4">
      <h1>{userData.name} Profile:</h1>
        <p>{userData.email}</p>
        {
          userData.trades.length === 0 && (
            <p>This user didn't make any trades yet.</p>
          )
        }

        {userData.trades.length > 0 && (
            userData.trades.map(trade =>  (
              <ul key={trade.id}>
                  <li>Direction: {trade.description}</li>
                  <li>Input: {trade.inputValue} - {trade.description.split(' ')[0]}</li>
                  <li>Output: {trade.outputValue} - {trade.description.split(' ')[2]}</li>
                  <li>Currency value in the trade moment: {trade.currentBidValue} - {trade.currentBidDate}</li>
                  <li>Date of trade: {trade.createdAt}</li>
              </ul>
            ))
        )}

        <p>
          <span className="mr-1.5">Back to</span>
          <Link to="/" className="text-blue-600 font-bold">Dashboard</Link>
        </p>
    </div>
  )
}
