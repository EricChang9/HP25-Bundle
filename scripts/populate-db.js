/**
 * Database Seeder Script
 * 
 * This script populates the Firestore database with fake data for testing and demonstration purposes.
 * It creates fake stories, loans, and bundles for the user with email pop@gmail.com.
 * 
 * Usage: node scripts/populate-db.js
 */

const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc,
  getDocs,
  query, 
  where,
  serverTimestamp,
  Timestamp
} = require('firebase/firestore');
const path = require('path');
const fs = require('fs');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG93e5r3mrGyxIvzmS79BUheglNJtEm3Y",
  authDomain: "hp25-51ec9.firebaseapp.com",
  projectId: "hp25-51ec9",
  storageBucket: "hp25-51ec9.firebasestorage.app",
  messagingSenderId: "262866145651",
  appId: "1:262866145651:web:d85d297ca705e87c843506"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample data
const loanPurposes = [
  'Agriculture',
  'Arts',
  'Clothing',
  'Construction',
  'Education',
  'Entertainment',
  'Food',
  'Health',
  'Housing',
  'Manufacturing',
  'Personal Use',
  'Retail',
  'Services',
  'Transportation',
  'Wholesale'
];

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'JPY'];
const paymentSchedules = ['weekly', 'biweekly', 'monthly'];
const requestStatus = ['pending', 'approved', 'rejected', 'completed'];
const repayStatus = ['pending', 'in_progress', 'paid', 'default'];

const storyTitles = [
  "My Journey to Start a Small Farm",
  "Building a Better Future Through Education",
  "Opening My Dream Restaurant",
  "Expanding My Clothing Business",
  "Healthcare Access for My Community",
  "Growing My Transportation Services",
  "Building Homes for Others",
  "Art Studio Expansion",
  "Manufacturing Innovation",
  "Tech Startup Journey",
  "Rebuilding After Disaster",
  "Bringing Clean Water to My Village",
  "Growing My Retail Store",
  "Developing Sustainable Solutions",
  "Investing in Community Education"
];

const storyDescriptions = [
  "With the help of this microloan, I was able to purchase essential farming equipment and seeds to start my family farm. Now I can provide fresh produce to my community and create a sustainable business.",
  "This loan enabled me to complete my education and obtain certification in teaching. I've now opened a small school in my village, providing quality education to children who previously had limited access.",
  "My dream of opening a restaurant became a reality thanks to this microloan. I've been able to create jobs for five people in my community and serve traditional cuisine to both locals and tourists.",
  "With the funds from this loan, I expanded my clothing business by purchasing a new sewing machine and fabrics. My customer base has grown by 40% since then.",
  "The microloan helped me open a small healthcare clinic in my rural community, providing essential medical services to people who previously had to travel far for healthcare.",
  "I used the loan to repair my taxi and upgrade it to meet safety standards. This has allowed me to increase my income by 30% and better provide for my family.",
  "Thanks to this loan, I was able to purchase construction materials and tools to build affordable housing units for families in need.",
  "The microloan enabled me to rent a small studio space and purchase art supplies, allowing me to create and sell my artwork professionally.",
  "With this funding, I upgraded my manufacturing equipment to produce goods more efficiently, resulting in higher quality products and increased sales.",
  "This loan helped me develop and launch my app idea, which now serves hundreds of users in my community and beyond.",
  "After a flood destroyed my shop, this microloan helped me rebuild and restock. I'm now back in business and stronger than ever.",
  "The funding allowed me to install a water purification system in my village, providing clean drinking water to over 100 families.",
  "I used the loan to expand my inventory and renovate my retail store, creating a better shopping experience that has attracted more customers.",
  "This microloan funded my research and development of eco-friendly products that help address environmental challenges in my region.",
  "The loan enabled me to purchase educational materials and technology for a community learning center that now serves children and adults alike."
];

const imageUrls = [
  "https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
  "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1593510987185-1ec2256148f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
];

// Helper functions
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
const getRandomTimestamp = (start, end) => Timestamp.fromDate(getRandomDate(start, end));

// Get the user ID for pop@gmail.com
async function getUserIdByEmail(email) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log(`No user found with email: ${email}`);
      return null;
    }
    
    const userDoc = querySnapshot.docs[0];
    console.log(`Found user: ${userDoc.id}`);
    return userDoc.id;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

// Create a fake loan
async function createFakeLoan(userId, index) {
  try {
    const purpose = getRandomElement(loanPurposes);
    const loanedAmount = getRandomNumber(500, 10000);
    const loanDuration = getRandomNumber(4, 104); // 1 month to 2 years in weeks
    const paymentSchedule = getRandomElement(paymentSchedules);
    const currency = getRandomElement(currencies);
    
    // Determine status based on index to ensure variety
    let reqStatus, repayStatus, amountRepaid, fundedAmount;
    
    if (index % 4 === 0) {
      // Completed loan
      reqStatus = 'completed';
      repayStatus = 'paid';
      amountRepaid = loanedAmount;
      fundedAmount = loanedAmount;
    } else if (index % 4 === 1) {
      // Approved and in progress
      reqStatus = 'approved';
      repayStatus = 'in_progress';
      amountRepaid = Math.floor(loanedAmount * Math.random() * 0.8); // Random partial payment
      fundedAmount = loanedAmount;
    } else if (index % 4 === 2) {
      // Pending approval
      reqStatus = 'pending';
      repayStatus = 'pending';
      amountRepaid = 0;
      fundedAmount = 0;
    } else {
      // Approved but not started repayment
      reqStatus = 'approved';
      repayStatus = 'pending';
      amountRepaid = 0;
      fundedAmount = loanedAmount;
    }
    
    const defaultRate = Math.random() * 0.1; // Random default rate between 0 and 10%
    
    const loanData = {
      user_id: userId,
      purpose: purpose,
      loaned_amount: loanedAmount,
      funded_amount: fundedAmount,
      loan_duration: loanDuration,
      payment_schedule: paymentSchedule,
      request_status: reqStatus,
      repay_status: repayStatus,
      amount_repaid: amountRepaid,
      currency: currency,
      created_at: getRandomTimestamp(new Date(2022, 0, 1), new Date(2023, 11, 31)),
      updated_at: Timestamp.now(),
      default_rate: defaultRate,
    };
    
    const loansRef = collection(db, 'loans');
    const docRef = await addDoc(loansRef, loanData);
    console.log(`Created loan ${index + 1} with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error creating fake loan:', error);
    throw error;
  }
}

// Create a fake story
async function createFakeStory(userId, loanId, index) {
  try {
    const title = storyTitles[index % storyTitles.length];
    const description = storyDescriptions[index % storyDescriptions.length];
    const imageUrl = imageUrls[index % imageUrls.length];
    const purpose = getRandomElement(loanPurposes);
    const amount = getRandomNumber(500, 10000);
    const currency = getRandomElement(currencies);
    
    const storyData = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      loanId: loanId,
      user_id: userId,
      purpose: purpose,
      amount: amount,
      currency: currency,
      created_at: getRandomTimestamp(new Date(2022, 0, 1), new Date(2023, 11, 31)),
      likes: getRandomNumber(0, 100),
      comments: [],
      status: 'active'
    };
    
    const storiesRef = collection(db, 'stories');
    const docRef = await addDoc(storiesRef, storyData);
    console.log(`Created story ${index + 1} with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error creating fake story:', error);
    throw error;
  }
}

// Create a fake bundle
async function createFakeBundle(loanIds, index) {
  try {
    // Use a subset of loan IDs for this bundle
    const bundleLoanIds = loanIds.slice(0, getRandomNumber(3, Math.min(5, loanIds.length)));
    
    if (bundleLoanIds.length < 3) {
      console.log('Not enough loans for a bundle, skipping bundle creation');
      return null;
    }
    
    const mValue = 1 + Math.random(); // Random M between 1 and 2
    const bundleValue = bundleLoanIds.length * getRandomNumber(1000, 3000);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + getRandomNumber(30, 365)); // End date between 1 month and 1 year
    
    const bundleData = {
      loan_ids: bundleLoanIds,
      M: mValue,
      bundle_id: index + 1,
      bundle_name: `Bundle ${index + 1} - ${getRandomElement(loanPurposes)}`,
      bundle_description: `A collection of ${bundleLoanIds.length} loans for ${getRandomElement(loanPurposes).toLowerCase()} purposes.`,
      bundle_status: true,
      bundle_value: bundleValue,
      bundle_created_at: Timestamp.now(),
      bundle_end_date: Timestamp.fromDate(endDate),
      i_rate: 0.08 + (Math.random() * 0.07) // Random interest rate between 8% and 15%
    };
    
    const bundlesRef = collection(db, 'bundles');
    const docRef = await addDoc(bundlesRef, bundleData);
    console.log(`Created bundle ${index + 1} with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error creating fake bundle:', error);
    throw error;
  }
}

// Main function to populate the database
async function populateDatabase() {
  try {
    // Get user ID for pop@gmail.com
    const userId = await getUserIdByEmail('pop@gmail.com');
    
    if (!userId) {
      console.log('Aborting: No user found with email pop@gmail.com');
      return;
    }
    
    console.log('Starting database population...');
    
    // Create 20 fake loans
    console.log('Creating fake loans...');
    const loanIds = [];
    for (let i = 0; i < 20; i++) {
      const loanId = await createFakeLoan(userId, i);
      loanIds.push(loanId);
    }
    
    // Create 15 fake stories linked to loans
    console.log('Creating fake stories...');
    for (let i = 0; i < 15; i++) {
      // Use a loan ID if available, otherwise use a placeholder
      const loanId = loanIds[i] || 'placeholder';
      await createFakeStory(userId, loanId, i);
    }
    
    // Create 5 fake bundles with the loans
    console.log('Creating fake bundles...');
    for (let i = 0; i < 5; i++) {
      await createFakeBundle(loanIds, i);
    }
    
    console.log('Database population completed successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

// Run the script
populateDatabase()
  .then(() => {
    console.log('Script execution completed.');
  })
  .catch((error) => {
    console.error('Script execution failed:', error);
  }); 