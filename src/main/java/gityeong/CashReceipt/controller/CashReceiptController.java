package gityeong.CashReceipt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gityeong.CashReceipt.entity.CashReceipt;
import gityeong.CashReceipt.service.CashReceiptService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class CashReceiptController {
    @Autowired
    private CashReceiptService service;

    @GetMapping("/receipts/getall")
    public ResponseEntity<List<CashReceipt>> getAllCashReceipts(){
        return new ResponseEntity<>(service.getAllCashReceiptsInSequence(), HttpStatus.OK);
    }

    @GetMapping("/receipts/get/{id}")
    public ResponseEntity<CashReceipt> getCashReceiptById(@PathVariable Long id) {
        try {
            CashReceipt receipt = service.findById(id);
            return new ResponseEntity<>(receipt, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/receipts/create")
    public ResponseEntity<CashReceipt> createCashReceipt(@RequestBody CashReceipt receipt) {
        return new ResponseEntity<>(service.createCashReceipt(receipt), HttpStatus.CREATED);
    }

    @PutMapping("/receipts/update/{id}")
    public ResponseEntity<CashReceipt> updateCashReceipt(@PathVariable Long id, @RequestBody CashReceipt receipt){
        CashReceipt updateReceipt = service.updateCashReceipt(id, receipt);
        if(updateReceipt != null){
            return new ResponseEntity<>(updateReceipt, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("receipts/delete/{id}")
    public ResponseEntity<Void> deleteCashReceipt(@PathVariable Long id) {
        try {
            service.deleteCashReceipt(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
}
