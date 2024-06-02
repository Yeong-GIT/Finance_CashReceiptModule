package gityeong.CashReceipt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gityeong.CashReceipt.entity.CashReceipt;
import gityeong.CashReceipt.repository.CashReceiptRepository;

@Service
public class CashReceiptService {
    @Autowired
    private CashReceiptRepository repository;

    public CashReceipt createCashReceipt(CashReceipt receipt){
        return repository.save(receipt);
    }

    public List<CashReceipt> getAllCashReceipt(){
        return repository.findAll();
    }
}
