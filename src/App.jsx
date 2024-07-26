import './style.scss';
import PeriodicTable from './components/PeriodicTable';
import SelectionBtns from './components/SelectionBtns';

const App = () => {
    return (
        <div className="periodic-table-container">
            <SelectionBtns />
<PeriodicTable />
        </div>
    )
}
export default App

                       