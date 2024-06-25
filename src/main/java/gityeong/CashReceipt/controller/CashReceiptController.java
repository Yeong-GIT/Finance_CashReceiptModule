package gityeong.CashReceipt.controller;

import gityeong.CashReceipt.entity.CashReceipt;
import gityeong.CashReceipt.service.CashReceiptService;
import gityeong.CashReceipt.service.KafkaProducerService;
import gityeong.CashReceipt.service.KafkaProducerService;
import org.apache.kafka.common.network.Send;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CashReceiptController {
    @Autowired
    private CashReceiptService service;

     @Autowired
     private KafkaProducerService kafkaProducerService;

    @GetMapping("/receipts")
    public ResponseEntity<List<CashReceipt>> getAllCashReceipts(){
        return new ResponseEntity<>(service.getAllCashReceiptsInSequence(), HttpStatus.OK);
    }

    @GetMapping("/receipts/{id}")
    public ResponseEntity<CashReceipt> getCashReceiptById(@PathVariable Long id) {
        try {
            CashReceipt receipt = service.findById(id);
            return new ResponseEntity<>(receipt, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/receipts")
    public ResponseEntity<CashReceipt> createCashReceipt(@RequestBody CashReceipt receipt) {
        CashReceipt savedReceipt = service.createCashReceipt(receipt);

        // Send Kafka message after successfully creating the cash receipt
         String message = String.format("Cash receipt created: ID=%d, Amount=%.2f, Date=%s",
                 savedReceipt.getId(), savedReceipt.getAmount(), savedReceipt.getReceiptDate());
         kafkaProducerService.sendMessage("cash-receipt-topic", message);

        return new ResponseEntity<>(savedReceipt, HttpStatus.CREATED);
    }

    @PutMapping("/receipts/{id}")
    public ResponseEntity<CashReceipt> updateCashReceipt(@PathVariable Long id, @RequestBody CashReceipt receipt){
        CashReceipt updateReceipt = service.updateCashReceipt(id, receipt);
        if(updateReceipt != null){
            // Send Kafka message after successfully updating the cash receipt
             String message = String.format("Cash receipt updated: ID=%d, Amount=%.2f, Date=%s",
                     updateReceipt.getId(), updateReceipt.getAmount(), updateReceipt.getReceiptDate());
             kafkaProducerService.sendMessage("cash-receipt-topic", message);

            return new ResponseEntity<>(updateReceipt, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/receipts/{id}")
    public ResponseEntity<Void> deleteCashReceipt(@PathVariable Long id) {
        try {
            service.deleteCashReceipt(id);

            // Send Kafka message after successfully deleting the cash receipt
             String message = String.format("Cash receipt deleted: ID=%d", id);
             kafkaProducerService.sendMessage("cash-receipt-topic", message);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
