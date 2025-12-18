import csv
import random

with open('test_data.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['x', 'y'])
    
    for i in range(1, 100000):
        x = random.randint(0, 800)
        y = random.randint(0, 600)
        writer.writerow([x, y])

print("CSV file 'test_data.csv' generated with 100 rows of test data.")