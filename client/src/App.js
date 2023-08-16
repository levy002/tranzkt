import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Header from './components/header';
import CategoryAndSubCategoryForms from './components/subCategoryForm';

function App() {
  return (
    <div className="container mx-auto text-center pt-3">
           <Header />
      <div className='flex w-full gap-3 max-w-6xl mx-auto'>
        <CategoryAndSubCategoryForms />
        <TransactionForm />
      </div>
     <TransactionList />
    </div>
  );
}

export default App;
