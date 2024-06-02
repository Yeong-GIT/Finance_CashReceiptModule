package gityeong.CashReceipt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gityeong.CashReceipt.entity.CashReceipt;
import gityeong.CashReceipt.service.CashReceiptService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/cash-receipts")
public class CashReceiptController {
    @Autowired
    private CashReceiptService service;

    @PostMapping
    public ResponseEntity<CashReceipt> createCashReceipt(@RequestBody CashReceipt receipt) {
        return new ResponseEntity<>(service.createCashReceipt(receipt), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CashReceipt>> getAllCashReceipt(){
        return new ResponseEntity<>(service.getAllCashReceipt(), HttpStatus.OK);
    }
    
}
