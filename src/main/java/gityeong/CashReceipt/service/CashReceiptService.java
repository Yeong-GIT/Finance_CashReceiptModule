package gityeong.CashReceipt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import gityeong.CashReceipt.entity.CashReceipt;
import gityeong.CashReceipt.repository.CashReceiptRepository;

@Service
public class CashReceiptService {
    @Autowired
    private CashReceiptRepository repository;

    public List<CashReceipt> getAllCashReceiptsInSequence(){
        Sort sort = Sort.by(Sort.Direction.ASC, "id"); // Assuming "id" is the primary key
        return repository.findAll(sort);
    }

    public CashReceipt findById(Long id){
        Optional<CashReceipt> optionalReceipt = repository.findById(id);
        if(optionalReceipt.isPresent()){
            return optionalReceipt.get();
        } else {
            throw new RuntimeException("Cash receipt with id " + id + " not found");
        }
    }

    public CashReceipt createCashReceipt(CashReceipt receipt){
        return repository.save(receipt);
    }

    public CashReceipt updateCashReceipt(Long id, CashReceipt receipt){
        Optional<CashReceipt> optionalReceipt = repository.findById(id);
        if(optionalReceipt.isPresent()){
            CashReceipt existingReceipt = optionalReceipt.get();
            existingReceipt.setCustomerName(receipt.getCustomerName());
            existingReceipt.setAmount(receipt.getAmount());
            existingReceipt.setReceiptDate(receipt.getReceiptDate());

            return repository.save(existingReceipt);
        }else{
            throw new RuntimeException("Cash receipt with id " + id + " not found");
        }
    }

    public boolean deleteCashReceipt(Long id){
        Optional<CashReceipt> optionalReceipt = repository.findById(id);
        if(optionalReceipt.isPresent()){
            repository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("Cash receipt with id " + id + " not found");
        }
    }

    
}
