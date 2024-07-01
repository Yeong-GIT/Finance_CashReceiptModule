package gityeong.CashReceipt.controller;

import gityeong.CashReceipt.entity.CashReceipt;
import gityeong.CashReceipt.service.CashReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CashReceiptController {
    @Autowired
    private CashReceiptService service;

    @GetMapping("/receipts")
    public ResponseEntity<List<CashReceipt>> getAllCashReceipts() {
        return new ResponseEntity<>(service.getAllCashReceipts(), HttpStatus.OK);
    }

    @GetMapping("/receipts/{id}")
    public ResponseEntity<CashReceipt> getCashReceiptById(@PathVariable Long id) {
        Optional<CashReceipt> receiptOpt = service.findById(id);
        if (receiptOpt.isPresent()) {
            return new ResponseEntity<>(receiptOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/receipts")
    public ResponseEntity<CashReceipt> createCashReceipt(@RequestBody CashReceipt receipt) {
        CashReceipt savedReceipt = service.createCashReceipt(receipt);
        return new ResponseEntity<>(savedReceipt, HttpStatus.CREATED);
    }

    @PutMapping("/receipts/{id}")
    public ResponseEntity<CashReceipt> updateCashReceipt(@PathVariable Long id, @RequestBody CashReceipt receipt) {
        CashReceipt updateReceipt = service.updateCashReceipt(id, receipt);
        if (updateReceipt != null) {
            return new ResponseEntity<>(updateReceipt, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/receipts/{id}")
    public ResponseEntity<Void> deleteCashReceipt(@PathVariable Long id) {
        try {
            service.deleteCashReceipt(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
